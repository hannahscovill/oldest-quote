import axios from "axios";

export const getQuotes = async (cursor) => {
  const url = cursor
    ? `${process.env.quotesBaseUrl}${cursor}`
    : `${process.env.quotesBaseUrl}/quotes`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.jwt}`,
      },
    })
    .then((response) => {
      return {
        quotes: response.data,
        headers: response.headers,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

// sample input:
// </quotes?cursor=01K30RB3D0ZEGMNAW1K4T7TC6S>; rel=self, </quotes?cursor=01K2Z2QRS06EMQNWHHE3GJ5DEZ>; rel=next
const linksFromHeader = (linkHeaderString) =>
  linkHeaderString.split(",").map((linkUriDescription) => {
    const urire = /<(.*)>/g;
    const linkType = linkUriDescription.split("=").pop();
    return {
      cursorType: linkType,
      actualLink: urire.exec(linkUriDescription)[1],
    };
  });

const oldestQuote = async () => {
  let overallOldestQuote = { created: "9999-12-31T23:59:59.999Z" };
  let cursorForNextPage = "";
  while (cursorForNextPage != undefined) {
    const quotesResponse = await getQuotes(cursorForNextPage);
    const {
      quotes: batchOfQuotes,
      headers: { link: allLinksConcatenated },
    } = quotesResponse;
    const nextLink = linksFromHeader(allLinksConcatenated).find(
      (link) => link.cursorType == "next"
    );
    cursorForNextPage = nextLink ? nextLink.actualLink : undefined;

    const oldestFromBatch = batchOfQuotes.reduce(
      (oldestQuoteFromBatchAccumulator, currentQuote) => {
        const oldestFromBatchMillis = Date.parse(oldestQuoteFromBatchAccumulator.created);
        const currentMillis = Date.parse(currentQuote.created);
        return currentMillis < oldestFromBatchMillis ? currentQuote : oldestQuoteFromBatchAccumulator;
      }
    );
    
    const overallOldestMillis = Date.parse(overallOldestQuote.created);
    const batchOldestMillis = Date.parse(oldestFromBatch.created);
    
    if (batchOldestMillis < overallOldestMillis) {
      overallOldestQuote = oldestFromBatch;
    }
  }
  console.log('the oldest quote is:')
  console.log(JSON.stringify(overallOldestQuote,null,2));
};

oldestQuote();

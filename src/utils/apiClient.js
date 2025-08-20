import axios from "axios";



const quotesApiConfig = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://candidate.commonroom.builders/quotes?cursor=01K30RB3D0ZEGMNAW1K4T7TC6S",
  headers: {
    Authorization:
      "Bearer REDACTED",
  },
};

export const getQuotes = async (path) => {
  return axios
    .request(`${baseuri}${path}`)
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

// let oldestQuote;

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


// get the first page
// parse dates & find oldest
// compare with the current overall oldest
// if there's a next link, call that and repeat

// when you're at the end of the pages, there's no next link

const oldestQuote = async (overallOldest, urlToCall) => {
  getQuotes(path).then((res) => {
    const {
      quotes,
      headers: { link },
    } = res;
    const nextLink = linksFromHeader(link).find(link => link.cursorType == 'next')


    console.log(linksFromHeader(link));
  });
};

oldestQuote();

import React from "react"

type Browser = {
  mantainedBy: string
  url: string
  version: number
}

const browserMap = new Map<string, Browser>();
const componies = ['Google', 'Mozilla', ' Microsoft']

const browsers: { name: string; url: string; version: number}[] = [
  { name: 'Chrome', url: 'https://chromeenterprise.google', version: 100},
  { name: 'Firefox', url: 'https://www.mozilla.org/js/firefox/new', version: 110},
  { name: 'Edge', url: 'https://www.microsoft.com/ja-jp/edge', version: 1.10}
]

componies.map((com, i) => {
  browserMap.set(com, {
    mantainedBy: browsers[i].name,
    url: browsers[i].url,
    version: browsers[i].version
  })
})

console.log(browserMap.get('Google'))

const MapNest: React.FC = () => {
  return(
    <>
      <h1>mapnest</h1>
    </>
  )
}

export default MapNest
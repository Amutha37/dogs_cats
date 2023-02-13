import React, { useState, useEffect } from 'react'

import { useFetch } from '../useAxios'

import { Allcatimgtable } from './Allcatimgtable'

export function Catimgdata() {
  const url = `https://api.thecatapi.com/v1/breeds?api_key=${process.env.REACT_APP_API_kEY_DOG}`
  const { status, results, error } = useFetch(url)
  const [apicatData, setApicatData] = useState([
    {
      id: '',
      name: '',
      origin: '',
      Life_span: '',
      Description: '',
      Temperament: '',
      url: '',
    },
  ])

  useEffect(() => {
    let datainforr = []
    let cathoverimgdata = results
    for (let infoo in cathoverimgdata) {
      // check if origin or country code availabe
      let imgul = ''
      !cathoverimgdata[infoo].image
        ? (imgul = '')
        : (imgul = cathoverimgdata[infoo].image.url)

      datainforr.push({
        id: cathoverimgdata[infoo].id,
        name: cathoverimgdata[infoo].name,
        origin: cathoverimgdata[infoo].origin,
        Life_span: cathoverimgdata[infoo].life_span,
        Description: cathoverimgdata[infoo].description,
        Temperament: cathoverimgdata[infoo].temperament,
        url: imgul,
      })
    }

    setApicatData(datainforr)
  }, [results])

  return (
    <>
      <div className='heading'>
        <h1>🐈 Characteristics</h1>
      </div>
      {/* <br /> */}
      {/* Error message */}
      <main>
        {status === 'idle' && (
          <div> Let's get started by searching for an article! </div>
        )}
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <div className='loading'></div>}
        {status === 'fetched' && (
          <>
            <Allcatimgtable apicatData={apicatData} />
          </>
        )}
      </main>
    </>
  )
}
// export default Catimgdata;

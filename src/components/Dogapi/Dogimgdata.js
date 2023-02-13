import React, { useEffect, useState } from 'react'
import { useFetch } from '../useAxios'
import { Alldogimgtable } from './Alldogimgtable'

export function Dogimgdata() {
  const url = `https://api.thedogapi.com/v1/breeds?api_key=${process.env.REACT_APP_API_kEY_DOG}`
  const { status, results, error } = useFetch(url)
  //   const [isErrorr, setIsErrorr] = useState(false);
  //   const [isLoadingg, setIsLoadingg] = useState(false);
  const [apiData, setApiData] = useState([
    {
      id: '',
      bred_for: '',
      breed_group: '',
      height: '',
      name: '',
      origin: '',
      life_span: '',
      Temperament: '',
      url: '',
    },
  ])

  useEffect(() => {
    let datainforr = []
    let doghoverimgdata = []
    doghoverimgdata = results

    for (let infor in doghoverimgdata) {
      // check if origin or country code availabe

      let oricontry = ''
      if (
        !doghoverimgdata[infor].origin &&
        !doghoverimgdata[infor].country_code
      ) {
        oricontry = ''
      } else {
        doghoverimgdata[infor].origin
          ? (oricontry = doghoverimgdata[infor].origin)
          : (oricontry = doghoverimgdata[infor].country_code)
      }
      // check if image available

      let dogimg = ''
      if (!doghoverimgdata[infor].image) {
        dogimg = ''
      } else {
        dogimg = doghoverimgdata[infor].image.url
      }

      datainforr.push({
        id: doghoverimgdata[infor].id,
        bred_for: doghoverimgdata[infor].bred_for,
        breed_group: doghoverimgdata[infor].breed_group,
        height: doghoverimgdata[infor].height.metric,
        name: doghoverimgdata[infor].name,
        origin: oricontry,
        life_span: doghoverimgdata[infor].life_span,
        temperament: doghoverimgdata[infor].temperament,
        url: dogimg,
      })
    }
    setApiData(datainforr)
  }, [results])

  return (
    <>
      <div className='heading'>
        <h1>🦮 Characteristics</h1>
      </div>
      <main>
        {status === 'idle' && (
          <div> Let's get started by searching for an article! </div>
        )}
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <div className='loading'></div>}
        {status === 'fetched' && (
          <>
            <Alldogimgtable apiData={apiData} />
          </>
        )}
      </main>
    </>
  )
}
// export default Dogimgdata;

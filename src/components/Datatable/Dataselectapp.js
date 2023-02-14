import React, { useState, useEffect } from 'react'
import { useFetch } from '../useAxios'
import Datatable from './Datatable'

function Dataselectapp() {
  const url = `https://api.thecatapi.com/v1/breeds?api_key=${process.env.REACT_APP_API_kEY_DOG}`
  const { status, results, error } = useFetch(url)
  const [dataa, setDataa] = useState([
    {
      id: '',
      name: '',
      origin: '',
      Life_span: '',
      Description: '',
      Temperament: '',
      // Image: {},
    },
  ])
  const [query, setQuery] = useState('')
  const [searchColumns, setSearchColumns] = useState(['origin'])

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsError(false);
  //     setIsLoading(true);

  //     try {
  //       const result = await axios.get(
  //         `https://api.thecatapi.com/v1/breeds?attach_breed=0&api_key=${process.env.REACT_APP_API_KEY_CAT}`
  //       );
  useEffect(() => {
    let datainfo = []
    let catData = results
    for (let info in catData) {
      datainfo.push({
        id: catData[info].id,
        name: catData[info].name,
        origin: catData[info].origin,
        Life_span: catData[info].life_span,
        Description: catData[info].description,
        Temperament: catData[info].temperament,
        // Image: catData[info].image,
      })
    }

    setDataa(datainfo)
  }, [results])

  // not all data is string
  const dataFilter = (rows) => {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    )
  }
  const columns = dataa[0] && Object.keys(dataa[0])

  return (
    <>
      <h1>🐱 API database</h1>
      <div className='checkboxes'>
        <form>
          <div className='searchbox'>
            <label>Search :</label>
            <input
              type='text'
              placeholder='search...'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className='checkbox'>
            {columns &&
              columns.map((column, index) => (
                <label key={index}>
                  <input
                    type='checkbox'
                    checked={searchColumns.includes(column)}
                    onChange={(e) => {
                      const checked = searchColumns.includes(column)
                      setSearchColumns((prev) =>
                        checked
                          ? prev.filter((sc) => sc !== column)
                          : [...prev, column]
                      )
                    }}
                  />
                  {column}
                </label>
              ))}
          </div>
        </form>
      </div>
      <main>
        {status === 'idle' && (
          <div> Let's get started by searching for an article! </div>
        )}
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <div className='loading'></div>}
        {status === 'fetched' && (
          <>
            <Datatable dataa={dataFilter(dataa)} />{' '}
          </>
        )}
      </main>
    </>
  )
}

export default Dataselectapp

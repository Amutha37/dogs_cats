import React, { useState } from 'react'
// data
import data from './menudata.json'

// router
import { withRouter } from 'react-router-dom'

// styling
import './Menu.css'

const Menu = (props) => {
  // conditionally render dropdown affect based on this boolean
  const [openMenu, setOpenMenu] = useState(false)

  // takes route string as parameter
  const pushToRoute = (route) => {
    props.history.push(route)
    setOpenMenu(false)
  }

  // render each menu item after initial Menu button
  const renderMenuItems = (data) => {
    const colorArr = ['#00ced1', '#7b68ee', '#6495ed']

    return data.menu.map((item, index) => {
      // if counter is over 2, resets to 0
      // for colorArr bracket notation to get sequence of colors

      // dynamic styles for each menu item
      const itemStyle = {
        top: `${index * 1.8}em`,
        backgroundColor: colorArr[index % colorArr.length],
        boxShadow: `2px 3px 3px #a77dda`,
      }

      return (
        <div className='home_page'>
          <div
            className='m-item'
            key={item.id}
            style={openMenu ? itemStyle : null}
            onClick={() => pushToRoute(item.route)}
          >
            {item.name}
          </div>
        </div>
      )
    })
  }

  return (
    <div className='menucontainer'>
      <div className='menu'>
        <div className={'m-item m-logo'} onClick={() => setOpenMenu(!openMenu)}>
          Select <i className='fab fa-react'></i>
        </div>

        {renderMenuItems(data)}
      </div>
    </div>
  )
}

export default withRouter(Menu)

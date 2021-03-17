import React, { useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from '../../utils/event-manager'
import './index.scss'
import { getMenus, Menu } from './service'

export const PostToc = ({ postContext }) => {
  const title = useMemo(() => postContext.frontmatter.title, [postContext])
  const [menus, setMenus] = useState([])

  const tocRef = useRef(null)

  const [focusedMenuIdx, setFocusedMenuIdx] = useState(-1)
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    Menu.menuEls = document.querySelectorAll('.post-container > h2')

    const fixedTop = tocRef.current.offsetTop
    const menus = getMenus(postContext)

    setMenus(menus)

    const scrollEventListener = throttle(() => {
      activeAnchor()
      fixContainer()

      /**
       * toc fixed 작업
       */
      function fixContainer() {
        if (scrollY > fixedTop) {
          setFixed(true)
        } else {
          setFixed(false)
        }
      }

      /**
       * scroll 위치에 따른 메뉴앵커 활성화
       */
      function activeAnchor() {
        setFocusedMenuIdx(curIdx => {
          const nextMenu = menus[curIdx + 1]
          if (nextMenu && scrollY >= nextMenu.offsetTop) {
            return curIdx + 1
          }

          const curMenu = menus[curIdx]
          if (curMenu && scrollY < curMenu.offsetTop) {
            return curIdx - 1
          }

          return curIdx
        })
      }
    }, 30)

    window.addEventListener('scroll', scrollEventListener)

    return () => {
      window.removeEventListener('scroll', scrollEventListener)
    }
  }, [])

  const handleClickNavItem = idx => {
    scrollTo({
      top: menus[idx].offsetTop + 1,
      behavior: 'smooth',
    })
  }

  return (
    <div className={`post-toc-container ${fixed ? 'fixed' : ''}`} ref={tocRef}>
      <div className="post-toc">
        <h1>{title}</h1>
        <ul>
          {menus.map((menu, idx) => (
            <li
              key={idx}
              className={idx === focusedMenuIdx ? 'active' : ''}
              onClick={() => handleClickNavItem(idx)}
            >
              {menu.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

const ROW_SIZE = 50

const times = (n) =>
  Array(n)
    .fill(0)
    .map((e, i) => i)

const ExpensiveCell = ({ background, index, sticky }) => {
  const width = sticky ? '300px' : '100px'
  return (
    <div
      style={{
        width,
        minWidth: width,
        height: '50px',
        background,
        position: sticky ? 'sticky' : undefined,
        left: sticky ? '0px' : undefined,
      }}
    >
      {index}
    </div>
  )
}

const Row = ({ i }) => {
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {times(10).map((id) => (
        <ExpensiveCell
          key={id}
          background={id === 0 ? 'pink' : (id + i) % 2 ? 'orange' : 'green'}
          index={i}
          sticky={id === 0}
        />
      ))}
    </div>
  )
}

const calculateItemsPerScreen = (itemsCount: number) => {
  const OVER_SCAN_ITEMS_COUNT = 3
  return Math.min(itemsCount, Math.floor(window.innerHeight / ROW_SIZE) + OVER_SCAN_ITEMS_COUNT)
}

const useTableMetaInfo = (itemsCount: number, containerRef, stickyListRef) => {
  const [itemsPerScreen, setItemsPerScreen] = useState(calculateItemsPerScreen(itemsCount))
  useEffect(() => {
    setItemsPerScreen(calculateItemsPerScreen(itemsCount))
  }, [itemsCount])
  const [itemsPositions, setItemsPositions] = useState(
    calculateElementsPosition(itemsPerScreen, containerRef, stickyListRef)
  )

  useEffect(() => {
    const onResize = () => {
      const nextItemsCount = calculateItemsPerScreen(itemsCount)

      if (nextItemsCount && nextItemsCount !== itemsCount) {
        setItemsPerScreen(nextItemsCount)
        setItemsPositions(calculateElementsPosition(nextItemsCount, containerRef, stickyListRef))
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [itemsCount])

  return { itemsPerScreen, itemsPositions }
}

function calculateElementsPosition(itemsPerScreen, containerRef, stickyListRef) {
  const items = times(itemsPerScreen)

  if (!containerRef?.current || !stickyListRef?.current) {
    return items.map((_, i) => ({ top: i * ROW_SIZE, index: i }))
  }

  let scrollTop = Math.abs(Math.max(-containerRef.current.getBoundingClientRect().top, 0))
  let scrollY = scrollTop % (itemsPerScreen * ROW_SIZE)

  const stickyBottomY =
    containerRef.current.offsetTop + containerRef.current.offsetHeight - stickyListRef.current.offsetHeight

  const isStickyBottom = window.scrollY >= stickyBottomY
  if (isStickyBottom) {
    // calculate last scrollY since block is not sticky more and it will move without any top updates required
    scrollY = (stickyBottomY - containerRef.current.offsetTop) % (itemsPerScreen * ROW_SIZE)
  }

  let totalIndex = Math.floor(scrollTop / ROW_SIZE)
  let index = totalIndex % items.length

  return items.map((_, i) => {
    if (i < index) {
      return { top: (items.length + i) * ROW_SIZE - scrollY, index: totalIndex + items.length - index + i }
    } else {
      return { top: i * ROW_SIZE - scrollY, index: totalIndex - index + i }
    }
  })
}

function Table() {
  const [itemsCount, setCount] = useState(1000)
  const stickyListRef = useRef<any>(null)
  const containerRef = useRef<any>(null)
  const { itemsPerScreen, itemsPositions } = useTableMetaInfo(itemsCount, containerRef, stickyListRef)
  const listRef = useRef<any>(null)

  useEffect(() => {
    const onScroll = () => {
      const itemsPositions = calculateElementsPosition(itemsPerScreen, containerRef, stickyListRef)
      const itemsDom = Array.from(listRef.current?.children)

      requestAnimationFrame(() => {
        itemsDom.map((e, i) => {
          if (e?.style) {
            e.style.top = `${itemsPositions[i]?.top}px`
            const index = itemsPositions[i]?.index
            e.style.display = index >= itemsCount ? 'none' : ''

            Array.from(e?.children?.[0]?.children).map((cell) => {
              if (cell) {
                cell.innerHTML = itemsPositions[i]?.index?.toString()
              }
            })
          }
        })
      })
    }

    document.addEventListener('scroll', onScroll, false)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [itemsPerScreen])

  return (
    <div style={{ height: itemsCount * ROW_SIZE }} ref={containerRef}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          background: 'red',
          overflow: 'visible',
        }}
        ref={stickyListRef}
      >
        <div style={{ width: '100%', position: 'relative', height: ROW_SIZE * itemsPerScreen }} ref={listRef}>
          {Array(itemsPerScreen)
            .fill(0)
            .map((e, i) => (
              <div
                style={{
                  width: '100%',
                  height: ROW_SIZE,
                  background: i % 2 ? 'pink' : 'purple',
                  position: 'absolute',
                  top: `${itemsPositions[i]?.top}px`,
                  display: 'flex',
                }}
                key={i}
              >
                <Row i={itemsPositions[i]?.index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <div style={{ height: '200px', width: '100%', background: 'green' }}>Filter</div>
      <div style={{ padding: '20px' }}>
        <Table />
      </div>
      <div style={{ height: '100px', width: '100%', background: 'orange' }}>Footer</div>
    </>
  )
}

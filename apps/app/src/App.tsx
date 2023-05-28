import { Suspense, useDeferredValue, useEffect, useRef, useState } from 'react'

const ROW_SIZE = 50

const times = (n) =>
  Array(n)
    .fill(0)
    .map((e, i) => i)

const ExpensiveCell = ({ background, index }) => {
  const [state, setState] = useState<any[]>([])
  const deferredState = useDeferredValue(state)

  const loading = deferredState !== state
  const generateData = () => {
    const data = []
    for (let i = 0; i < 1_000; i++) {
      data.push(`Item ${i}`)
    }
    return data
  }
  generateData()

  return (
    <Suspense fallback={null}>
      <div style={{ width: '100px', minWidth: '100px', height: '50px', background: loading ? 'black' : background }}>
        {index}
      </div>
    </Suspense>
  )
}

const Row = ({ i }) => {
  const id = 0
  return times(100).map((id) => <ExpensiveCell key={id} background={(id + i) % 2 ? 'orange' : 'green'} index={i} />)
}

function Table() {
  const [itemsCount, setCount] = useState(20)

  window.ADD = (n = 1) => setCount((i) => i + n)
  const itemsPerScreen = Math.min(itemsCount, Math.floor(window.innerHeight / ROW_SIZE) + 4)

  const listRef = useRef<any>(null)
  const stickyListRef = useRef<any>(null)
  const containerRef = useRef<any>(null)

  useEffect(() => {
    const onResize = () => {}
    document.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('resize', onResize)
    }
  }, [])
  useEffect(() => {
    const onScroll = () => {
      const items = Array.from(listRef.current?.children)

      let scrollTop = Math.abs(Math.max(-containerRef.current.getBoundingClientRect().top, 0))
      let scrollY = scrollTop % (itemsPerScreen * ROW_SIZE)

      const stickyBottomY =
        containerRef.current.offsetTop + containerRef.current.offsetHeight - stickyListRef.current.offsetHeight

      const isStickyBottom = window.scrollY >= stickyBottomY
      if (isStickyBottom) {
        // calculate last scrollY since block is not sticky more and it will move without any top updates required
        scrollY = (stickyBottomY - containerRef.current.offsetTop) % (itemsPerScreen * ROW_SIZE)
      }

      let index = Math.floor(scrollY / ROW_SIZE) % items.length

      requestAnimationFrame(() => {
        items.map((e, i) => {
          if (i < index) {
            e.style.top = `${(items.length + i) * ROW_SIZE - scrollY}px`
          } else {
            e.style.top = `${i * ROW_SIZE - scrollY}px`
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
        style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, background: 'red' }}
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
                  top: i * ROW_SIZE,
                  display: 'flex',
                }}
                key={i}
              >
                <Row i={i} />
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
      <div style={{ height: '100px', width: '100%', background: 'green' }}>Filter</div>
      <div style={{ padding: '20px' }}>
        <Table />
      </div>
      <div style={{ height: '100px', width: '100%', background: 'orange' }}>Footer</div>
    </>
  )
}

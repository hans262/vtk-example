import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  initRenderer, destoryRenderer,
  removeActor, renderActor
} from 'store/actions'

const mapstate = ({ vtk }) => ({ vtk })
export default connect(mapstate)((props) => {
  const view = useRef(null)
  const { dispatch, vtk } = props
  const { dataCache } = vtk

  useEffect(() => {
    //初始化渲染器
    const vtkGenericRenderWindow = window.vtk.Rendering.Misc.vtkGenericRenderWindow
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0]
    })
    genericRenderWindow.setContainer(view.current)
    genericRenderWindow.resize()
    const renderer = genericRenderWindow.getRenderer()
    const renderWindow = genericRenderWindow.getRenderWindow()
    dispatch(initRenderer(renderer, renderWindow))

    return () => {
      dispatch(destoryRenderer())
    }
  }, [])

  function change(e, v) {
    const { target: { checked } } = e
    const { id } = v
    const actors = dataCache.find(x => x.id === id).actor
    if (checked) {
      dispatch(renderActor(actors))
    } else {
      dispatch(removeActor(actors))
    }
  }
  return (
    <div>
      <div ref={view} style={{ height: 600 }}></div>
      <div style={{ marginTop: '20px' }}>
        {dataCache.map(v =>
          <label key={v.id} style={{ margin: '0 10px 0 0' }}>
            <input type="checkbox" value={v.id} onChange={e => change(e, v)} />
            {v.name}
          </label>
        )}
      </div>
    </div>
  )
})


import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { initRenderer, destoryRenderer } from 'store/vtk/actions'

export default connect()((props) => {
  const ref = useRef(null)
  const { dispatch } = props
  useEffect(() => {
    //初始化渲染器
    const vtkGenericRenderWindow = window.vtk.Rendering.Misc.vtkGenericRenderWindow
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0]
    })
    genericRenderWindow.setContainer(ref.current)
    genericRenderWindow.resize()
    const renderer = genericRenderWindow.getRenderer()
    const renderWindow = genericRenderWindow.getRenderWindow()
    dispatch(initRenderer(renderer, renderWindow))
    return () => {
      //销毁渲染器
      dispatch(destoryRenderer())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div ref={ref} style={{ height: 800 }}></div>
  )
})


import { useRef, useEffect } from 'react'
import { DataModel } from './data'

import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow'
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer'

function App() {
  const divRef = useRef<HTMLDivElement>(null)
  const renderer = useRef<vtkRenderer>()
  const renderWindow = useRef<vtkRenderWindow>()

  useEffect(() => {
    if (!divRef.current) return
    //初始化渲染器
    const vtkGenericRenderWindow = window.vtk.Rendering.Misc.vtkGenericRenderWindow
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0],
    })
    genericRenderWindow.setContainer(divRef.current)
    genericRenderWindow.resize()
    renderer.current = genericRenderWindow.getRenderer()
    renderWindow.current = genericRenderWindow.getRenderWindow()
  }, [])

  function change(e: React.ChangeEvent<HTMLInputElement>, v: any) {
    if (!renderer.current || !renderWindow.current) return
    const { target: { checked } } = e
    const { id } = v
    const actors = DataModel.find((x: any) => x.id === id).actor

    if (checked) {
      renderer.current.addActor(actors)
      renderer.current.resetCamera()
      renderWindow.current.render()

    } else {
      actors.forEach((v: any) => {
        renderer.current?.removeActor(v)
      })

      renderer.current.resetCamera()
      renderWindow.current.render()
    }
  }

  return (
    <div>
      <div ref={divRef} style={{ height: 600 }}></div>
      <div style={{ marginTop: '20px' }}>
        {DataModel.map((v: any) =>
          <label key={v.id} style={{ margin: '0 10px 0 0' }}>
            <input
              type="checkbox"
              value={v.id}
              onChange={e => change(e, v)}
            />
            {v.name}
          </label>
        )}
      </div>
    </div>
  )
}

export default App
import React, { useEffect, useRef } from 'react'

export default function App(){
  const ref=useRef(null)
  useEffect(()=>{
    //导入椎体
    const vtkMapper= window.vtk.Rendering.Core.vtkMapper
    const vtkActor= window.vtk.Rendering.Core.vtkActor
    const vtkConeSource=window.vtk.Filters.Sources.vtkConeSource

    //创建渲染器，渲染窗口
    const vtkGenericRenderWindow = window.vtk.Rendering.Misc.vtkGenericRenderWindow
    const genericRenderWindow=vtkGenericRenderWindow.newInstance()
    genericRenderWindow.setContainer(ref.current)
    genericRenderWindow.resize()
    const renderer = genericRenderWindow.getRenderer()
    const renderWindow = genericRenderWindow.getRenderWindow()

    //创建椎体
    const cone= vtkConeSource.newInstance()

    //创建映射器
    const mapper=vtkMapper.newInstance()
    //将椎体数据映射到mapper
    mapper.setInputConnection(cone.getOutputPort())

    //创建actor
    const actor=vtkActor.newInstance()
    //将actor与映射器绑定
    actor.setMapper(mapper)

    //将actor添加到渲染器
    renderer.addActor(actor)
    //重置相机
    renderer.resetCamera()
    //执行渲染
    renderWindow.render()
  })
  return(
    <div ref={ref} style={{width:500,height:500}}></div>
  )
}
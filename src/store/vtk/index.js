import { actor, selectList } from './source'
import {
  INIT_RENDERER,
  DESTORY_RENDERER,
  RENDER_ACTOR,
  REMOVE_ACTOR,
} from './actions'

const initVtk = {
  renderer: null,
  renderWindow: null,
  actorCache: actor(),
  selectList: selectList
}
export default function vtk(state = initVtk, action) {
  switch (action.type) {
    case INIT_RENDERER:
      return {
        ...state,
        renderer: action.renderer,
        renderWindow: action.renderWindow
      }
    case DESTORY_RENDERER:
      return { ...state, renderer: null, renderWindow: null }
    case RENDER_ACTOR:
      state.renderer.addActor(action.actors)
      state.renderer.resetCamera()
      state.renderWindow.render()
      return state
    case REMOVE_ACTOR:
      action.actors.forEach((v) => {
        state.renderer.removeActor(v)
      })
      state.renderer.resetCamera()
      state.renderWindow.render()
      return state
    default:
      return state
  }
}
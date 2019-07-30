import { actor, getSelectList } from './source'
import fetchActor from './fetchActor'
import {
  INIT_RENDERER,
  DESTORY_RENDERER,
  RENDER_ACTOR,
  REMOVE_ACTOR,
  FETCH_ACTOR,
  CACHE_ACTOR,
  LOADING_END
} from './actions'

const initVtk = {
  renderer: null,
  renderWindow: null,
  actorCache: actor(),
  selectList: getSelectList()
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
    case FETCH_ACTOR:
      fetchActor(action.sopIUID, action.id)
      return {
        ...state,
        selectList: state.selectList.map((v) =>
          v.id === action.id ? ({ ...v, loading: true }) : v
        )
      }
    case CACHE_ACTOR:
      return {
        ...state,
        actorCache: {
          ...state.actorCache,
          [action.id]: [
            ...state.actorCache[action.id],
            action.actor
          ]
        }
      }
    case LOADING_END:
      return {
        ...state,
        selectList: state.selectList.map((v) =>
          v.id === action.id ? ({ ...v, loading: action.loading }) : v
        )
      }
    default:
      return state
  }
}
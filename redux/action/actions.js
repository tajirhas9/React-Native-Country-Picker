import { ActionType } from './action_types'

export const ToggleLoadingAction = () => {
    type : ActionType.TOOGLE_LOADING
}

export const AddNewTagAction = (payload) => {
    type: ActionType.ADD_NEW_TAG,
    payload
}

export const UpdateTextAction = (payload) => {
    type: ActionType.UPDATE_TEXT,
    payload
}

export const UpdateCountryListAction = (payload) => {
    type: ActionType.UPDATE_COUNTRY_LIST,
    payload
}
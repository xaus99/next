import { UiState } from './';


type UictionType =
  | { type: 'Ui - ToggleMenu'; };


export const uiReducer = (state: UiState, action: UictionType): UiState => {

  switch (action.type) {
    case 'Ui - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };

    default:
      return state;
  }
};

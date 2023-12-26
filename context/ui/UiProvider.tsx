import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};


export const UiProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: 'Ui - ToggleMenu' });
  };

  const data = {
    ...state,
    toggleSideMenu,
  };


  return (
    <UiContext.Provider value={data} >
      {children}
    </UiContext.Provider>
  );
};

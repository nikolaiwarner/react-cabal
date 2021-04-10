import { Image, View } from 'react-native-web'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import CabalList from './CabalList'

const AppSidebarContainer = styled.View`
  align-items: center;
  background-color: #16161d;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
  flex: 0 0 4.4rem;
  justify-content: space-between;
  overflow-y: auto;
  padding-top: 2rem;
`

const Footer = styled.View`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`

const SettingsButton = styled.View`
  align-items: center;
  color: rgba(255, 255, 255, 0.25);
  /* cursor: pointer; */
  display: flex;
  height: 2rem;
  justify-content: center;
  margin: 0 0 0.75rem 0;
  opacity: 0.8;
  /* transition: all 0.05s ease-in-out; */
  width: 2rem;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
  }
`

export default function AppSidebar({ cabals, currentCabal }) {
  return (
    <AppSidebarContainer>
      <CabalList cabals={cabals} currentCabal={currentCabal} />
      <Footer>
        <SettingsButton>
          <Image src="static/images/icon-gear.svg" />
        </SettingsButton>
      </Footer>
    </AppSidebarContainer>
  )
}

AppSidebar.propTypes = {
  cabals: PropTypes.object.isRequired,
  currentCabal: PropTypes.object.isRequired,
}

import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import RNModuleTemplateModule, { ImageSvg } from 'react-native-image-svg'

const App = () => {
  useEffect(() => {
    // console.log(RNModuleTemplateModule)
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageSvg />
    </View>
  )
}

export default App

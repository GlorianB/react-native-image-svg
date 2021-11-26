import * as React from 'react'
import { useEffect, useState } from 'react'
import RN, {
  Image,
  Text,
  NativeModules,
  ImageSourcePropType,
  View,
} from 'react-native'

import JsxParser from 'react-jsx-parser'

import { Svg, G, Path, Circle, SvgProps } from 'react-native-svg'

const svgImage: ImageSourcePropType = require('./assets/logocopy.svg')

export const ImageSvg = () => {
  const [svgXmlData, setSvgXmlData] = useState<string | undefined>()
  const [formatedSvgXmlData, setFormatedSvgXmlData] = useState<
    string | undefined
  >()

  const resolvedSource = Image.resolveAssetSource(svgImage)

  const formatSvgString = (svgString?: string) => {
    if (!svgString) return
    // To Uppercase
    const svgStringUpper = svgString
      .replace(/<([a-z])/g, (str) => str.toUpperCase())
      .replace(/<\/([a-z])/g, (str) => str.toUpperCase())

    //Deleting xmlns
    const formattedSvg = svgStringUpper.replace(/xmlns=('|")(.*?)('|")/g, '')

    return formattedSvg
  }

  const fetchSVGData = async (uri: string) => {
    let responseXML,
      error = null
    try {
      const response = await fetch(uri)
      responseXML = await response.text()
      formatSvgString(responseXML)
    } catch (e) {
      error = e
      console.error('ERROR SVG', e)
    } finally {
      if (!error) {
        const formattedSvg = formatSvgString(responseXML)
          ?.replace(/\n/g, ' ')
          .replace(/\>[\t ]+\</g, '><')
        console.log(formattedSvg)

        setFormatedSvgXmlData(formattedSvg)
      }
    }

    return responseXML
  }

  useEffect(() => {
    fetchSVGData(resolvedSource.uri)
  }, [])

  if (!formatedSvgXmlData) {
    return null
  }

  // console.log(formatedSvgXmlData)

  return (
    <View>
      <JsxParser
        components={{ Svg, G, Path, Circle, Text, View }}
        renderInWrapper={false}
        jsx={'<Svg></Svg>'}
        blacklistedAttrs={[]}
      />
    </View>
  )
}

export default NativeModules.RNModuleTemplateModule

import { useState, useRef, useMemo } from 'react'
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@emotion/react';
import { YMaps, Map, Polygon } from "react-yandex-maps"
// @mui
import { Container, Typography, Stack } from '@mui/material';
import { useSnackbar } from 'notistack'
// components
import { useSettingsContext } from '../components/settings';
import useCopyToClipboard from '../utils/useCopyToClipboard'


// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();
  const { copy } = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar();
  const mapRef = useRef(null)
  const polygonRef = useRef(null)
  const [geometry, setGeometry] = useState([])
  const [mapCenter, setMapCenter] = useState([
    40.09542371199067, 67.8524865328819])


  console.log(geometry, 'G E O M E T R Y')

  console.log(mapRef, "MAP CENTER")
  const themeCon = useSettingsContext()

  const onCopy = () => {
    copy(JSON.stringify(geometry))
    enqueueSnackbar('Copied', {
      autoHideDuration: 1000,
      variant: 'success',
      position: 'bottom',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    });

  }

    // **************** DRAW POLYGON ******************
    const draw = (ref) => {
      ref.editor.startDrawing()
      polygonRef.current = ref
    }

  // ************ FIND CENTER OF SELECTED POLYGON **************
  const findEverage = (arr) => {
    const sum = arr.reduce((prev, cur) => [prev[0] + cur[0], prev[1] + cur[1]])
    const res = [sum[0] / arr.length, sum[1] / arr.length]

    return res
  }
  // *********** SET SELECTED POLYGON GEOMETRY ***********
  const changeGeometry = () => {
    setGeometry(polygonRef.current.geometry.getCoordinates())
  }

  // ************** INITIAL MAP STATE **************
  const defaultState = {
    center: mapCenter,
    zoom: 16,
  }
  // ************* INITIAL MAP OPTIONS *************
  const options = {
    editorDrawingCursor: "crosshair",
    draggable: true,
    fillColor: "rgba(255, 99, 71, 0.6)",
    stokeColor: "#255985",
    editorMaxPoints: 1000,
    strokeWidth: 4,
    opacity: 0.8,
  }

  const initialValues = useMemo(
    () => ({
      name: "",
      waveTime: "",
      distance_for_courier_busy: "",
      waves: [
        {
          wave_radius: "",
          wave_duration: "",
        },
      ],
      step_by_step: true,
      radius: "",
    }),
    []
  )



  return (
    <>
      <Helmet>
        <title> Page One | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page One
        </Typography>

        <Typography gutterBottom>
          Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc
        </Typography>


        <div>
                <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                  <Map
                    instanceRef={(ref) => {
                      if (ref) mapRef.current = ref
                    }}
                    style={{
                      width: "100%",
                      height: "60vh",
                    }}
                    state={defaultState}
                  >
                    <Polygon
                      defaultGeometry={[]}
                      geometry={geometry}
                      options={options}
                      instanceRef={(ref) => ref && draw(ref)}
                      onGeometryChange={changeGeometry}
                    />
                  </Map>
                </YMaps>
              </div>

            <Stack onClick={onCopy} sx={{
              cursor: 'pointer'
            }}>
              {JSON.stringify(geometry)}
              </Stack>
      </Container>
    </>
  );
}

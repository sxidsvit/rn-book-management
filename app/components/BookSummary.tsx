import React from 'react'
import useAI from '../hooks/useAI'
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native'
import RenderHTML from 'react-native-render-html'
import Divider from './Divider'
import Loading from './Loading'

interface IBookSummary {
  title: string
  authors: string[]
}

const BookSummary = (props: IBookSummary) => {
  const { title, authors } = props

  const { width } = useWindowDimensions()

  const prompt = `Generate a detailed and well-structured summary of the book titled "${title}" by ${authors.join(
    ', ',
  )}. Use appropriate HTML tags to format the summary.`

  const { data, isFetching, error, refetch } = useAI(prompt)

  if (isFetching) return <Loading />

  if (error) return <Text>Error</Text>

  if (data) {
    const source = {
      html: `<div style="color: white; margin-top: 30px"> ${data} </div>`,
    }

    return (
      <>
        <Divider />
        <Text style={styles.heading}>Summary:</Text>
        <RenderHTML contentWidth={width} source={source} />
      </>
    )
  }

  return (
    <Pressable style={styles.container} onPress={async () => await refetch()}>
      <Text style={styles.btnText}>AI Summary</Text>
    </Pressable>
  )
}

export default BookSummary

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4ecdc4',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 30,
  },
  btnText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4ecdc4',
    textTransform: 'capitalize',
    marginTop: 50,
  },
})

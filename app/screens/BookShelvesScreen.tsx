import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SegmentedButtons from '../components/SegmentedButtons'
import useBookShelves from '../store'
import BookShelfItem from '../components/BookShelfItem'
import GoBack from '../components/GoBack'
import Divider from '../components/Divider'
import { BookShelves } from '../types'
import { BOOK_SHELVES } from '../components/SelectBookShelf'

const BookShelvesScreen = () => {
  const [selectedBookShelf, setSelectedBookShelf] = useState(BookShelves.Read)

  const { books } = useBookShelves()

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <GoBack />
          <SegmentedButtons
            buttons={BOOK_SHELVES}
            value={selectedBookShelf}
            setValue={setSelectedBookShelf}
          />
        </View>

        <FlatList
          data={books.filter((item) => item.bookShelfId === selectedBookShelf)}
          renderItem={({ item }) => <BookShelfItem {...item} />}
          keyExtractor={(item) => item.bookId}
          ItemSeparatorComponent={Divider}
          contentContainerStyle={{
            gap: 5,
            padding: 10,
          }}
        />
      </View>
    </View>
  )
}

export default BookShelvesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292f36',
  },
  innerContainer: {
    maxWidth: 1000,
    margin: 'auto',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 190,
    marginBottom: 60,
    marginTop: 20,
  },
  topContainer: {
    padding: 20,
    gap: 15,
  },
})

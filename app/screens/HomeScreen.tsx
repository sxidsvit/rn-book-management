import React from 'react'
import { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import BookItem from '../components/BookItem'
import useSearch from '../hooks/useSearch'
import Divider from '../components/Divider'
import GoToBookShelves from '../components/GoToBookShelves'

const HomeScreen = () => {
  const [search, setSearch] = useState('')

  const { data, refetch } = useSearch(search)

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <GoToBookShelves />
          <SearchBar setSearch={setSearch} onPress={refetch} />
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => <BookItem {...item} />}
          keyExtractor={(item) => item.id}
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

export default HomeScreen

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
  topContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    maxWidth: 1200,
    alignSelf: 'center',
    marginBottom: 60,
  },
})

import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import BookScreen from './screens/BookScreen'
import BookShelvesScreen from './screens/BookShelvesScreen'
import { StackParamList } from './types'
import useBookShelves from './store'

const queryClient = new QueryClient()

const Stack = createStackNavigator<StackParamList>()

const App = () => {
  const { loadBooksFromStorage } = useBookShelves()

  useEffect(() => {
    loadBooksFromStorage()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {/* <View style={styles.container}> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
        <Stack.Screen name="BookShelves" component={BookShelvesScreen} />
      </Stack.Navigator>
      {/* </View> */}
    </QueryClientProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    maxWidth: 1200,
  },
})

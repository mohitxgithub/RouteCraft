import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { formatCurrency } from '../utils/currencyUtils'
import { Itinerary } from '../types/itinerary'

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 5 },
  section: { marginBottom: 10 },
})

const ItineraryPDF: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Your Travel Itinerary</Text>
      <Text style={styles.subtitle}>Destination: {itinerary.destination}</Text>
      <Text style={styles.text}>From: {itinerary.startDate} To: {itinerary.endDate}</Text>
      <Text style={styles.text}>Travelers: {itinerary.travelers}</Text>
      <Text style={styles.text}>Budget: {formatCurrency(itinerary.budget, itinerary.currency)}</Text>
      
      {itinerary.days.map((day, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.subtitle}>Day {index + 1} - {day.date}</Text>
          {day.activities.map((activity, actIndex) => (
            <Text key={actIndex} style={styles.text}>• {activity}</Text>
          ))}
          <Text style={styles.text}>Accommodation: {day.accommodation}</Text>
        </View>
      ))}
      
      <Text style={styles.subtitle}>Total Cost: {formatCurrency(itinerary.totalCost, itinerary.currency)}</Text>
    </Page>
  </Document>
)

export default ItineraryPDF


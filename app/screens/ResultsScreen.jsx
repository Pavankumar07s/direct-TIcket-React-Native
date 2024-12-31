import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Train, ArrowRight, MapPin, Clock } from 'lucide-react-native';
import { MotiView } from 'moti';
import DirectTrainCard from '../../components/DirectTrainCard';
import ConnectingTrainCard from '../../components/ConnectingTrainCard';

const ResultsScreen = ({ route }) => {
  const { directTrains = [], connectingTrains = [] } = route.params || {};

  const renderHeader = (title, icon) => (
    <View style={styles.headerContainer}>
      {icon}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  const renderNoDataView = (message) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.noDataContainer}
    >
      <Clock size={32} color="#808080" style={styles.noDataIcon} />
      <Text style={styles.noDataText}>{message}</Text>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader('Direct Trains', <Train size={28} color="#FFFFFF" strokeWidth={1.5} />)}
        
        {directTrains.length > 0 ? (
          directTrains.map((train, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 400,
                delay: index * 100,
              }}
              style={styles.cardContainer}
            >
              <DirectTrainCard train={train} />
            </MotiView>
          ))
        ) : (
          renderNoDataView('No direct trains available for this route')
        )}

        {renderHeader('Connecting Trains', <ArrowRight size={28} color="#FFFFFF" strokeWidth={1.5} />)}
        
        {connectingTrains.length > 0 ? (
          connectingTrains.map((journey, index) => (
            <MotiView
              key={`journey-${index}`}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 400,
                delay: index * 100,
              }}
              style={styles.journeyContainer}
            >
              <View style={styles.connectionHeader}>
                <MapPin size={24} color="#E0E0E0" strokeWidth={1.5} />
                <Text style={styles.connectionStation}>
                  Connection at {journey.connectionStation}
                </Text>
              </View>

              <View style={styles.timelineContainer}>
                <View style={styles.timeline} />
                <View style={styles.trainSection}>
                  <Text style={styles.trainLabel}>First Train</Text>
                  <ConnectingTrainCard train={journey.firstTrain} />
                </View>
                <View style={styles.trainSection}>
                  <Text style={styles.trainLabel}>Second Train</Text>
                  <ConnectingTrainCard train={journey.secondTrain} />
                </View>
              </View>

              <View style={styles.journeyInfo}>
                <Clock size={20} color="#808080" strokeWidth={1.5} />
                <Text style={styles.journeyText}>
                  Total Journey: {journey.totalDuration}
                </Text>
              </View>
            </MotiView>
          ))
        ) : (
          renderNoDataView('No connecting trains available for this route')
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  cardContainer: {
    marginBottom: 16,
  },
  journeyContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  connectionStation: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E0E0E0',
    marginLeft: 10,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 24,
    marginBottom: 16,
  },
  timeline: {
    position: 'absolute',
    left: 12,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: '#333333',
  },
  trainSection: {
    marginBottom: 20,
  },
  trainLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#CCCCCC',
    marginBottom: 12,
  },
  noDataContainer: {
    padding: 32,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  noDataIcon: {
    marginBottom: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  journeyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  journeyText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginLeft: 8,
  }
});

export default ResultsScreen;
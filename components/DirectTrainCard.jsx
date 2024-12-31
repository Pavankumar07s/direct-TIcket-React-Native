import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Train, Clock, ArrowRight, MapPin } from 'lucide-react-native';
import { MotiView } from 'moti';

const DirectTrainCard = ({ train, onPress }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const {
    trainNumber,
    trainName,
    fromStation,
    toStation,
    duration,
    departureTime,
    arrivalTime,
    status = 'On Time',
    platform = '1',
    coachClass = '2A',
  } = train;

  const renderTimeBlock = (time, station, type) => (
    <View style={[styles.timeBlock, isSmallScreen && styles.timeBlockSmall]}>
      <Text style={[styles.time, isSmallScreen && styles.timeSmall]}>{time}</Text>
      <View style={styles.stationContainer}>
        <MapPin size={isSmallScreen ? 14 : 16} color="#808080" style={styles.stationIcon} />
        <Text style={[styles.station, isSmallScreen && styles.stationSmall]} numberOfLines={2}>
          {station}
        </Text>
      </View>
      <Text style={[
        styles.timeLabel,
        type === 'arrival' && styles.arrivalLabel,
        isSmallScreen && styles.timeLabelSmall
      ]}>
        {type === 'departure' ? 'Departure' : 'Arrival'}
      </Text>
    </View>
  );

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 400 }}
    >
      <TouchableOpacity 
        style={[styles.card, isSmallScreen && styles.cardSmall]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Header */}
        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <View style={styles.trainInfo}>
            <Train size={isSmallScreen ? 16 : 20} color="#FFFFFF" strokeWidth={1.5} />
            <Text style={[styles.trainNumber, isSmallScreen && styles.trainNumberSmall]}>
              {trainNumber}
            </Text>
            <Text style={[styles.trainName, isSmallScreen && styles.trainNameSmall]} numberOfLines={1}>
              {trainName}
            </Text>
          </View>
          <View style={[
            styles.statusBadge,
            status === 'On Time' ? styles.onTime : styles.delayed,
            isSmallScreen && styles.statusBadgeSmall
          ]}>
            <Text style={[styles.statusText, isSmallScreen && styles.statusTextSmall]}>
              {status}
            </Text>
          </View>
        </View>

        {/* Journey Details */}
        <View style={[styles.journeyContainer, isSmallScreen && styles.journeyContainerSmall]}>
          {renderTimeBlock(departureTime, fromStation, 'departure')}
          
          <View style={styles.journeyLine}>
            <View style={styles.line} />
            <View style={[styles.durationBadge, isSmallScreen && styles.durationBadgeSmall]}>
              <Clock size={isSmallScreen ? 12 : 14} color="#FFFFFF" />
              <Text style={[styles.durationText, isSmallScreen && styles.durationTextSmall]}>
                {duration}
              </Text>
            </View>
            <ArrowRight size={isSmallScreen ? 14 : 16} color="#808080" />
          </View>
          
          {renderTimeBlock(arrivalTime, toStation, 'arrival')}
        </View>

        {/* Footer */}
        <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
          {!isSmallScreen && (
            <>
              <View style={styles.infoChip}>
                <Text style={styles.infoLabel}>Platform</Text>
                <Text style={styles.infoValue}>{platform}</Text>
              </View>
              
              <View style={styles.infoChip}>
                <Text style={styles.infoLabel}>Class</Text>
                <Text style={styles.infoValue}>{coachClass}</Text>
              </View>
            </>
          )}
          
          <TouchableOpacity 
            style={[styles.detailsButton, isSmallScreen && styles.detailsButtonSmall]}
          >
            <Text style={[styles.detailsButtonText, isSmallScreen && styles.detailsButtonTextSmall]}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardSmall: {
    padding: 12,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerSmall: {
    marginBottom: 12,
    paddingBottom: 12,
  },
  trainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trainNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 8,
  },
  trainNumberSmall: {
    fontSize: 14,
    marginLeft: 6,
    marginRight: 6,
  },
  trainName: {
    color: '#808080',
    fontSize: 14,
    flex: 1,
  },
  trainNameSmall: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  onTime: {
    backgroundColor: '#1C4024',
  },
  delayed: {
    backgroundColor: '#662222',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextSmall: {
    fontSize: 10,
  },
  journeyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  journeyContainerSmall: {
    marginBottom: 12,
  },
  timeBlock: {
    flex: 1,
  },
  timeBlockSmall: {
    minWidth: 80,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  timeSmall: {
    fontSize: 16,
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stationIcon: {
    marginRight: 4,
  },
  station: {
    color: '#E0E0E0',
    fontSize: 14,
    flex: 1,
  },
  stationSmall: {
    fontSize: 12,
  },
  timeLabel: {
    color: '#808080',
    fontSize: 12,
  },
  timeLabelSmall: {
    fontSize: 10,
  },
  arrivalLabel: {
    textAlign: 'right',
  },
  journeyLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#333333',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  durationBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  durationTextSmall: {
    fontSize: 10,
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerSmall: {
    paddingTop: 12,
    justifyContent: 'flex-end',
  },
  infoChip: {
    backgroundColor: '#262626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  infoLabel: {
    color: '#808080',
    fontSize: 10,
    marginBottom: 2,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsButton: {
    marginLeft: 'auto',
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsButtonTextSmall: {
    fontSize: 12,
  },
});

export default DirectTrainCard;
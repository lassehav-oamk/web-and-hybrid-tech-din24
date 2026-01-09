import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

interface DataItem {
  id: string;
  title: string;
  description: string;
  value: number;
}

interface PerformanceDemoProps {
  useFlatList: boolean;
}

// Generate 1000 items
const generateData = (): DataItem[] => {
  const items: DataItem[] = [];

  for (let i = 1; i <= 1000; i++) {
    items.push({
      id: i.toString(),
      title: `Item #${i}`,
      description: `This is the description for item number ${i}. It contains some text to make the item more realistic.`,
      value: Math.floor(Math.random() * 1000)
    });
  }

  return items;
};

export default function PerformanceDemo({ useFlatList }: PerformanceDemoProps) {
  const [data] = useState<DataItem[]>(generateData());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [renderTime, setRenderTime] = useState<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  // Reset timer when mode changes
  useEffect(() => {
    startTimeRef.current = Date.now();
    setRenderTime(0);

    // Small delay to capture actual render time
    const timer = setTimeout(() => {
      setRenderTime(Date.now() - startTimeRef.current);
    }, 100);

    return () => clearTimeout(timer);
  }, [useFlatList]);

  const renderItem = (item: DataItem) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        key={useFlatList ? undefined : item.id}
        style={[styles.itemCard, isSelected && styles.selectedItem]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.valueBadge}>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {useFlatList ? '⚡ FlatList' : '🐌 ScrollView'}
        </Text>
        <Text style={styles.headerSubtitle}>1000 Items</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Performance Info:</Text>
          <Text style={styles.infoText}>
            {useFlatList
              ? '✓ FlatList only renders visible items\n✓ Items are recycled as you scroll\n✓ Memory efficient\n✓ Smooth scrolling even with 1000+ items'
              : '✗ ScrollView renders ALL 1000 items at once\n✗ High memory usage\n✗ Slow initial render\n✗ May cause performance issues'}
          </Text>
          <Text style={styles.renderTime}>Initial render: ~{renderTime}ms</Text>
        </View>
      </View>
    );
  };

  let selectedScrollOutput = null;
  if (useFlatList) {
    selectedScrollOutput = (
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={5}
          removeClippedSubviews={true}
          contentContainerStyle={styles.listContent}
        />
    );
  }

  // ScrollView renders ALL items at once
  selectedScrollOutput = (
      <ScrollView contentContainerStyle={styles.listContent}>
        {renderHeader()}
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderItem(item)}
            {index < data.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </ScrollView> 
  );

  return (
    <View style={styles.container}>
      {selectedScrollOutput}
      <View style={styles.selectedItemFooter}>
        <Text style={{color: '#fff'}}>Selected Item ID: {selectedId}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1976D2',
    padding: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 18,
    marginBottom: 8,
  },
  renderTime: {
    fontSize: 11,
    color: '#FFC107',
    fontWeight: '600',
    marginTop: 4,
  },
  itemCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#1976D2',
    backgroundColor: '#E3F2FD',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  valueBadge: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  valueText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  separator: {
    height: 8,
  },
  selectedItemFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#164f00ff',
    alignItems: 'center'
  }
});

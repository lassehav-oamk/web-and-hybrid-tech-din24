import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

interface Company {
  id: string;
  name: string;
  businessArea: string;
  address: string;
}

// Generate 100 dummy companies
const generateCompanies = (): Company[] => {
  const businessAreas = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Education', 'Real Estate', 'Transportation', 'Food & Beverage',
    'Entertainment', 'Consulting', 'Marketing', 'Construction', 'Energy'
  ];

  const streets = [
    'Main St', 'Oak Ave', 'Maple Dr', 'Pine Rd', 'Cedar Ln',
    'Elm St', 'Washington Blvd', 'Park Ave', 'Broadway', 'Market St'
  ];

  const cities = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
    'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
    'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Seattle, WA'
  ];

  const companyPrefixes = [
    'Innovative', 'Global', 'Premier', 'Advanced', 'Dynamic',
    'Elite', 'Precision', 'Summit', 'Apex', 'Nexus', 'Prime',
    'Strategic', 'Unified', 'Quantum', 'Stellar'
  ];

  const companySuffixes = [
    'Solutions', 'Industries', 'Group', 'Corporation', 'Enterprises',
    'Technologies', 'Systems', 'Partners', 'Associates', 'Holdings'
  ];

  const companies: Company[] = [];

  for (let i = 1; i <= 100; i++) {
    const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
    const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
    const businessArea = businessAreas[Math.floor(Math.random() * businessAreas.length)];
    const streetNumber = Math.floor(Math.random() * 9999) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    companies.push({
      id: i.toString(),
      name: `${prefix} ${suffix}`,
      businessArea,
      address: `${streetNumber} ${street}, ${city}`
    });
  }

  return companies;
};

export default function FlatListDemo() {
  const [companies] = useState<Company[]>(generateCompanies());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderCompanyItem = ({ item }: { item: Company }) => {
    const isSelected = item.id === selectedId;

    return (
      <TouchableOpacity
        style={[styles.companyCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>{item.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>#{item.id}</Text>
          </View>
        </View>
        <View style={styles.companyDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💼</Text>
            <Text style={styles.detailText}>{item.businessArea}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Company Directory</Text>
      <Text style={styles.headerSubtitle}>100 Companies Listed</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>End of company list</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No companies found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        renderItem={renderCompanyItem} // Takes an item from data and renders it into the list.
        keyExtractor={(item) => item.id} //  React Native needs to track which item is which. This tells FlatList: "For each company item, use the id property as its unique identifier."
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={true}
        initialNumToRender={1} // How many items to render in the initial batch. This should be enough to fill the screen but not much more. 
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  companyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  companyDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  separator: {
    height: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
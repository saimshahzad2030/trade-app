import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { historicalDataType } from '@/types/types';

 

interface HistoricalPDFProps {
  historicalData: historicalDataType;
}

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  table: { display: 'flex', flexDirection: 'column', width: '100%' },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #e0e0e0' },
  tableCell: { flex: 1, padding: 5, textAlign: 'center' },
  tableHeaderCell: { flex: 1, padding: 5, fontWeight: 'bold', backgroundColor: '#f0f0f0' },
});

const HistoricalPDF: React.FC<HistoricalPDFProps> = ({ historicalData }) => {
  const { dates } = historicalData.results[0];
  const quote = historicalData.results[0].indicators.quote[0];
  const adjclose = historicalData.results[0].indicators.adjclose[0].adjclose;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Historical Stock Data</Text>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Open</Text>
            <Text style={styles.tableHeaderCell}>High</Text>
            <Text style={styles.tableHeaderCell}>Low</Text>
            <Text style={styles.tableHeaderCell}>Close</Text>
            <Text style={styles.tableHeaderCell}>Adj Close</Text>
            <Text style={styles.tableHeaderCell}>Volume</Text>
          </View>

          {/* Data Rows */}
          {dates.map((date, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCell}>{date}</Text>
              <Text style={styles.tableCell}>{quote.open[i] ?? '-'}</Text>
              <Text style={styles.tableCell}>{quote.high[i] ?? '-'}</Text>
              <Text style={styles.tableCell}>{quote.low[i] ?? '-'}</Text>
              <Text style={styles.tableCell}>{quote.close[i] ?? '-'}</Text>
              <Text style={styles.tableCell}>{adjclose[i] ?? '-'}</Text>
              <Text style={styles.tableCell}>{quote.volume[i] ?? '-'}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const HistoricalDataPDFDownload: React.FC<HistoricalPDFProps> = ({ historicalData }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<HistoricalPDF historicalData={historicalData} />}
        fileName="historical-data.pdf"
      >
        {({ loading }) => (loading ? 'Generating PDF...' : <Download />)}
      </PDFDownloadLink>
    </div>
  );
};

export default HistoricalDataPDFDownload;

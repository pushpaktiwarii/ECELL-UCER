import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('final_all_participants_certificates.xlsx')

# Convert to dictionary format
data = df.to_dict('records')

# Clean the data - convert phone numbers to strings and handle NaN values
for record in data:
    # Convert phone number to string and remove scientific notation
    if 'Phone' in record and pd.notna(record['Phone']):
        record['Phone'] = str(int(record['Phone']))
    else:
        record['Phone'] = ''
    
    # Handle NaN values in other fields
    for key, value in record.items():
        if pd.isna(value):
            record[key] = ''

# Save to JSON file
with open('all_participants_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Data converted successfully!')
print(f'Total participants: {len(data)}')
print('\nSample data:')
print(json.dumps(data[0], indent=2))

# Also create a simplified version for the verification system
simplified_data = []
for record in data:
    simplified_record = {
        "Cert_ID": record.get('Certificate ID', ''),
        "Name": record.get('Participant Name', ''),
        "Team_Name": record.get('Team Name', ''),
        "College": record.get('College', ''),
        "Startup_Idea": record.get('Startup Idea Title', ''),
        "Email": record.get('Email', ''),
        "Phone": record.get('Phone', ''),
        "Event": "Eureka! Pitching Competition 2025",
        "Date": "29-08-2025"
    }
    simplified_data.append(simplified_record)

# Save simplified version
with open('certificates_verification_data.json', 'w', encoding='utf-8') as f:
    json.dump(simplified_data, f, indent=2, ensure_ascii=False)

print(f'\nSimplified data created for verification system!')
print(f'Total certificates: {len(simplified_data)}')
print('\nSample simplified data:')
print(json.dumps(simplified_data[0], indent=2))

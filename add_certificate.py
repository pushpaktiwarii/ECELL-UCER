import json
import os

def add_certificate():
    """Add a new certificate to the verification system"""
    
    print("🎓 E-Cell UCER Certificate Addition Tool")
    print("=" * 50)
    
    # Get certificate details
    cert_id = input("Enter Certificate ID (e.g., PITCHDECK25-001): ").strip()
    name = input("Enter Participant Name: ").strip()
    team_name = input("Enter Team Name: ").strip()
    college = input("Enter College Name: ").strip()
    startup_idea = input("Enter Startup Idea: ").strip()
    email = input("Enter Email (optional): ").strip()
    phone = input("Enter Phone (optional): ").strip()
    event = input("Enter Event Name: ").strip()
    date = input("Enter Event Date (e.g., 29-08-2025): ").strip()
    
    # Create certificate object
    certificate = {
        "Cert_ID": cert_id,
        "Name": name,
        "Team_Name": team_name,
        "College": college,
        "Startup_Idea": startup_idea,
        "Email": email if email else "",
        "Phone": phone if phone else "",
        "Event": event,
        "Date": date
    }
    
    # Load existing data
    try:
        with open('certificates_verification_data.json', 'r', encoding='utf-8') as f:
            certificates = json.load(f)
    except FileNotFoundError:
        certificates = []
    
    # Check if certificate ID already exists
    existing_cert = next((cert for cert in certificates if cert['Cert_ID'] == cert_id), None)
    if existing_cert:
        print(f"\n⚠️  Certificate ID '{cert_id}' already exists!")
        update = input("Do you want to update it? (y/n): ").lower()
        if update == 'y':
            # Remove existing certificate
            certificates = [cert for cert in certificates if cert['Cert_ID'] != cert_id]
        else:
            print("Certificate not added.")
            return
    
    # Add new certificate
    certificates.append(certificate)
    
    # Save updated data
    with open('certificates_verification_data.json', 'w', encoding='utf-8') as f:
        json.dump(certificates, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Certificate '{cert_id}' added successfully!")
    print(f"Total certificates: {len(certificates)}")

def view_certificates():
    """View all certificates"""
    try:
        with open('certificates_verification_data.json', 'r', encoding='utf-8') as f:
            certificates = json.load(f)
        
        print(f"\n📋 Total Certificates: {len(certificates)}")
        print("=" * 50)
        
        for i, cert in enumerate(certificates[:10], 1):  # Show first 10
            print(f"{i}. {cert['Cert_ID']} - {cert['Name']} ({cert['Team_Name']})")
        
        if len(certificates) > 10:
            print(f"... and {len(certificates) - 10} more certificates")
            
    except FileNotFoundError:
        print("No certificates found!")

def search_certificate():
    """Search for a specific certificate"""
    cert_id = input("Enter Certificate ID to search: ").strip()
    
    try:
        with open('certificates_verification_data.json', 'r', encoding='utf-8') as f:
            certificates = json.load(f)
        
        certificate = next((cert for cert in certificates if cert['Cert_ID'].upper() == cert_id.upper()), None)
        
        if certificate:
            print(f"\n✅ Certificate Found!")
            print("=" * 30)
            for key, value in certificate.items():
                print(f"{key}: {value}")
        else:
            print(f"\n❌ Certificate '{cert_id}' not found!")
            
    except FileNotFoundError:
        print("No certificates found!")

def main():
    while True:
        print("\n" + "=" * 50)
        print("🎓 E-Cell UCER Certificate Management")
        print("=" * 50)
        print("1. Add New Certificate")
        print("2. View All Certificates")
        print("3. Search Certificate")
        print("4. Exit")
        
        choice = input("\nSelect an option (1-4): ").strip()
        
        if choice == '1':
            add_certificate()
        elif choice == '2':
            view_certificates()
        elif choice == '3':
            search_certificate()
        elif choice == '4':
            print("👋 Thank you for using Certificate Management Tool!")
            break
        else:
            print("❌ Invalid option! Please try again.")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# launcher script
import os
import csv
import re
import sys
import subprocess
import shutil
from pathlib import Path

def get_desktop_path():
    return str(Path.home() / 'Desktop')

def generate_csv(export_dir, output_csv="LeetCode_Submissions.csv"):
    data = []
    print("Generating CSV...")
    if not os.path.exists(export_dir):
        return False
        
    for problem_folder in os.listdir(export_dir):
        problem_path = os.path.join(export_dir, problem_folder)
        if not os.path.isdir(problem_path) or problem_folder.startswith('.'):
            continue
            
        match = re.match(r'^(\d+)\s*-\s*(.*)$', problem_folder)
        if match:
            question_id = match.group(1)
            title = match.group(2)
        else:
            question_id = ""
            title = problem_folder
            
        for filename in os.listdir(problem_path):
            if filename.endswith(".html") or filename.startswith('.'):
                continue 
                
            sub_match = re.search(r'(.*?) - (.*?) - runtime (.*?) - memory (.*?)\.(.*)', filename)
            if sub_match:
                data.append({
                    "Question ID": question_id,
                    "Title": title,
                    "Status": sub_match.group(2),
                    "Date": sub_match.group(1),
                    "Language": sub_match.group(5),
                    "Runtime": sub_match.group(3),
                    "Memory": sub_match.group(4),
                    "Code File": filename
                })
                
    if not data:
        print("No submissions found.")
        return False
        
    keys = ["Question ID", "Title", "Status", "Date", "Language", "Runtime", "Memory", "Code File"]
    desktop_csv = os.path.join(get_desktop_path(), output_csv)
    
    with open(desktop_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
        
    print(f"\n✅ Success! Exported {len(data)} submissions.")
    print(f"📂 Your CSV file has been saved to your Desktop as: {output_csv}")
    return True

def main():
    print("="*50)
    print("  🚀 LC Export")
    print("="*50)
    print("\nPlease enter your LeetCode authentication cookies.\n")
    
    session_cookie = input("LEETCODE_SESSION: ").strip()
    csrf_token = input("csrftoken (optional): ").strip()
    
    if not session_cookie:
        print("Error: LEETCODE_SESSION cookie is required!")
        sys.exit(1)
        
    if csrf_token:
        cookie_string = f"LEETCODE_SESSION={session_cookie}; csrftoken={csrf_token};"
    else:
        cookie_string = f"LEETCODE_SESSION={session_cookie};"
        
    export_dir = "temp_leetcode_data"
    
    print("\n📦 Checking dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "-r", "requirements.txt"], check=True)
    except Exception as e:
        print(f"Failed to install dependencies from requirements.txt: {e}")
        sys.exit(1)
        
    print("\n⬇️  Downloading your LeetCode submissions (this may take a minute)...")
    
    cmd = [
        sys.executable, "-m", "lc_export", 
        "--cookies", cookie_string,
        "--folder", export_dir,
        "--no-problem-statement"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        success = generate_csv(export_dir)
        
        if not success:
            print("\n❌ Failed to generate CSV. Please ensure your cookies are valid and not expired.")
            print("LC Export Output:")
            print(result.stdout)
            if result.stderr:
                print(result.stderr)
                
    finally:
        if os.path.exists(export_dir):
            print("\n🧹 Cleaning up temporary files...")
            shutil.rmtree(export_dir)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nCancelled by user.")
        sys.exit(0)

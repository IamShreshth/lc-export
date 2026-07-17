import os
import csv
import re
import sys

def generate_csv(export_dir, output_csv="my_leetcode_questions.csv"):
    data = []
    
    # Iterate through problem folders
    for problem_folder in os.listdir(export_dir):
        problem_path = os.path.join(export_dir, problem_folder)
        # Skip hidden files or non-directories
        if not os.path.isdir(problem_path) or problem_folder.startswith('.'):
            continue
            
        # Try to parse problem ID and name (e.g. "001 - two-sum" or similar)
        match = re.match(r'^(\d+)\s*-\s*(.*)$', problem_folder)
        if match:
            question_id = match.group(1)
            title = match.group(2)
        else:
            question_id = ""
            title = problem_folder
            
        # Find submissions inside the problem folder
        for filename in os.listdir(problem_path):
            # Skip problem description HTML files and hidden files
            if filename.endswith(".html") or filename.startswith('.'):
                continue 
                
            # Parse submission filename 
            # Default format: "{date_formatted} - {status_display} - runtime {runtime} - memory {memory}.{extension}"
            sub_match = re.search(r'(.*?) - (.*?) - runtime (.*?) - memory (.*?)\.(.*)', filename)
            if sub_match:
                date = sub_match.group(1)
                status = sub_match.group(2)
                runtime = sub_match.group(3)
                memory = sub_match.group(4)
                language = sub_match.group(5)
                
                data.append({
                    "Question ID": question_id,
                    "Title": title,
                    "Status": status,
                    "Date": date,
                    "Language": language,
                    "Runtime": runtime,
                    "Memory": memory,
                    "Code File": filename
                })
                
    if not data:
        print(f"No submissions found in '{export_dir}'. Make sure you run lc-export first!")
        return
        
    # Write to CSV
    keys = ["Question ID", "Title", "Status", "Date", "Language", "Runtime", "Memory", "Code File"]
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
        
    print(f"✅ Successfully exported {len(data)} submissions to {output_csv}")

if __name__ == "__main__":
    # If a folder is passed as an argument use it, otherwise use the current directory
    export_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    generate_csv(export_dir)

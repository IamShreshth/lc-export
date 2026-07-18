const fileExtensions = {
  "python": "py", "python3": "py", "pythondata": "pd.py",
  "c": "c", "cpp": "cpp", "csharp": "cs", "java": "java",
  "kotlin": "kt", "mysql": "sql", "mssql": "sql", "oraclesql": "sql",
  "javascript": "js", "html": "html", "php": "php", "golang": "go",
  "scala": "scala", "pythonml": "py", "rust": "rs", "ruby": "rb",
  "bash": "sh", "swift": "swift", "typescript": "ts", "elixir": "ex",
  "erlang": "erl", "racket": "rkt", "dart": "dart"
};

const statusText = document.getElementById("status-text");
const statusIndicator = document.getElementById("status-indicator");
const exportBtn = document.getElementById("export-btn");
const progressPanel = document.getElementById("progress-panel");
const consoleLog = document.getElementById("console-log");

function log(msg) {
  consoleLog.textContent += msg + "\n";
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

function updateProgress(percent, labelText) {
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-percent").innerText = Math.round(percent) + "%";
  document.getElementById("progress-label").innerText = labelText;
}

// 1. Check LeetCode active session
chrome.cookies.get({ url: "https://leetcode.com", name: "LEETCODE_SESSION" }, (cookie) => {
  if (cookie && cookie.value) {
    statusText.innerText = "Connected to LeetCode";
    statusIndicator.className = "status-dot connected";
    exportBtn.disabled = false;
  } else {
    statusText.innerText = "Log in to LeetCode first";
    statusIndicator.className = "status-dot disconnected";
    exportBtn.disabled = true;
    log("Error: No active LEETCODE_SESSION cookie found. Please log in to LeetCode in your browser.");
  }
});

// 2. CSV generator utility
function toCsvString(rows) {
  return rows.map(row => 
    row.map(val => {
      let strVal = String(val);
      if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
        return `"${strVal.replace(/"/g, '""')}"`;
      }
      return strVal;
    }).join(',')
  ).join('\r\n');
}

// 3. String cleanup helper
function removeSpecialCharacters(str) {
  return str ? str.replace(/[\/\b\\:\*\?"<>\|]/g, '') : '';
}

// 4. Export logic
exportBtn.addEventListener("click", async () => {
  exportBtn.disabled = true;
  progressPanel.style.display = "block";
  consoleLog.textContent = "";
  
  const onlyAccepted = document.querySelector('input[name="mode"]:checked').value === "accepted";
  
  log("Starting submissions export...");
  updateProgress(5, "Contacting LeetCode...");
  
  let submissions = [];
  let offset = 0;
  const limit = 20;
  let hasNext = true;
  
  try {
    while (hasNext) {
      log(`Fetching offset ${offset}...`);
      const response = await fetch(`https://leetcode.com/api/submissions/?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      
      const data = await response.json();
      if (!data.submissions_dump || data.submissions_dump.length === 0) {
        break;
      }
      
      submissions.push(...data.submissions_dump);
      hasNext = data.has_next && data.submissions_dump.length > 0;
      offset += limit;
      
      // Update progress bar dynamically (assuming ~300 max questions for simple progress feel)
      const currentProgress = Math.min(80, 5 + (offset / 10));
      updateProgress(currentProgress, `Fetched ${submissions.length} submissions...`);
      
      // Sleep/cooldown to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    log(`Fetched ${submissions.length} total submissions.`);
    updateProgress(85, "Filtering data...");
    
    // Filter submissions if needed
    if (onlyAccepted) {
      submissions = submissions.filter(s => s.status_display === "Accepted");
      log(`Filtered to ${submissions.length} Accepted submissions.`);
    }
    
    if (submissions.length === 0) {
      log("No submissions found to export.");
      updateProgress(0, "No submissions");
      exportBtn.disabled = false;
      return;
    }
    
    updateProgress(90, "Creating ZIP archive...");
    const zip = new JSZip();
    const csvRows = [["Question ID", "Title", "Status", "Date", "Language", "Runtime", "Memory", "Code File"]];
    
    for (const sub of submissions) {
      const questionId = sub.question_id || "";
      const cleanTitle = removeSpecialCharacters(sub.title);
      const folderName = `${questionId} - ${cleanTitle}`;
      
      // Format timestamp to YYYY-MM-DD HH.MM.SS
      const date = new Date(sub.timestamp * 1000);
      const pad = (num) => String(num).padStart(2, '0');
      const dateFormatted = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}.${pad(date.getMinutes())}.${pad(date.getSeconds())}`;
      
      const cleanStatus = removeSpecialCharacters(sub.status_display);
      const cleanRuntime = removeSpecialCharacters(sub.runtime.replace(/\s+/g, ''));
      const cleanMemory = removeSpecialCharacters(sub.memory.replace(/\s+/g, ''));
      const ext = fileExtensions[sub.lang] || "txt";
      
      const codeFilename = `${dateFormatted} - ${cleanStatus} - runtime ${cleanRuntime} - memory ${cleanMemory}.${ext}`;
      
      // Add the file to zip in its folder
      zip.file(`${folderName}/${codeFilename}`, sub.code);
      
      // Add to CSV metadata
      csvRows.push([
        questionId,
        sub.title,
        sub.status_display,
        dateFormatted,
        sub.lang,
        sub.runtime,
        sub.memory,
        codeFilename
      ]);
    }
    
    // Create the CSV file inside zip
    zip.file("LeetCode_Submissions.csv", toCsvString(csvRows));
    
    updateProgress(95, "Generating download blob...");
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    
    log("Triggering ZIP download...");
    chrome.downloads.download({
      url: url,
      filename: "LeetCode_Submissions.zip",
      saveAs: true
    }, () => {
      updateProgress(100, "Export completed!");
      log("✅ Success! ZIP archive downloaded.");
      exportBtn.disabled = false;
    });
    
  } catch (error) {
    log(`❌ Error: ${error.message}`);
    updateProgress(0, "Failed");
    exportBtn.disabled = false;
  }
});

document.getElementById('create-folder').addEventListener('click', function() {
  // Check if Master Folder already exists
  chrome.bookmarks.search({ title: 'Master Folder' }, function(results) {
    if (results.length > 0) {
      showCustomAlert("⚠️ Master Folder already exists!");
      return;
    }

    // Create Master Folder
    chrome.bookmarks.create({ title: 'Master Folder', parentId: '1' }, function(masterFolder) {
      const masterFolderId = masterFolder.id;

      const personalFolderLinks = [
        'INFORMATION', 'EDUCATION', 'CAREER', 'HEALTH', 'FITNESS', 'NUTRITION',
        'WARDROBE', 'HOBBIES', 'TRANSPORTATION', 'FINANCE', 'HOUSE', 'MOMENTS', 'ACCOUNTS'
      ];

      const universityFolderLinks = ['INFO DOCS', 'YEAR 1', 'YEAR 2', 'YEAR 3', 'YEAR 4'];
      const businessFolderLinks = [
        '1️⃣ CREATE', '2️⃣ DISTRIBUTE', '3️⃣ ANALYTICS', '4️⃣ SETUP A BUSINESS'
      ];

      function createSubjectLinks(subjectFolderId) {
        const subjectLinks = ['Lectures', 'Assignments', 'Exams'].map(label => {
          return { title: label, url: `https://www.google.com/` };
        });

        subjectLinks.forEach(link => {
          chrome.bookmarks.create({ parentId: subjectFolderId, title: link.title, url: link.url });
        });
      }

      // Create Personal Folder
      chrome.bookmarks.create({ title: 'Personal Folder', parentId: masterFolderId }, function(personalFolder) {
        personalFolderLinks.forEach(folder => {
          chrome.bookmarks.create({ parentId: personalFolder.id, title: folder });
        });
      });

      // Create University Folder
      chrome.bookmarks.create({ title: 'University Folder', parentId: masterFolderId }, function(universityFolder) {
        universityFolderLinks.forEach(year => {
          chrome.bookmarks.create({ parentId: universityFolder.id, title: year }, function(yearFolder) {
            if (year.includes('YEAR')) {
              ['Semester 1', 'Semester 2'].forEach(semester => {
                chrome.bookmarks.create({ parentId: yearFolder.id, title: semester }, function(semesterFolder) {
                  ['Subject 1', 'Subject 2'].forEach(subject => {
                    chrome.bookmarks.create({ parentId: semesterFolder.id, title: subject }, function(subjectFolder) {
                      createSubjectLinks(subjectFolder.id);
                    });
                  });
                });
              });
            }
          });
        });
      });

      // Create Business Folder
      chrome.bookmarks.create({ title: 'Business Folder', parentId: masterFolderId }, function(businessFolder) {
        businessFolderLinks.forEach(folder => {
          chrome.bookmarks.create({ parentId: businessFolder.id, title: folder }, function(folderCreated) {
            // Adding subfolders under "CREATE" folder in the Business Folder
            if (folder === '1️⃣ CREATE') {
              const createSubfolders = [
                'BRAND', 'WEBSITE', 'PRODUCT', 'MOCKUP', 'SOCIALS', 'CONTENT', 'EMAIL MARKETING'
              ];
              createSubfolders.forEach(subfolder => {
                chrome.bookmarks.create({ parentId: folderCreated.id, title: subfolder });
              });
            }

            // Adding subfolders under "DISTRIBUTE" folder in the Business Folder
            if (folder === '2️⃣ DISTRIBUTE') {
              const distributeSubfolders = ['NICHE PLATFORMS', 'SOCIAL PLATFORMS', 'SCHEDULE PLATFORMS'];
              distributeSubfolders.forEach(subfolder => {
                chrome.bookmarks.create({ parentId: folderCreated.id, title: subfolder });
              });
            }

            // Adding subfolders under "ANALYTICS" folder in the Business Folder
            if (folder === '3️⃣ ANALYTICS') {
              const analyticsSubfolders = ['NICHE PLATFORMS', 'SOCIAL PLATFORMS'];
              analyticsSubfolders.forEach(subfolder => {
                chrome.bookmarks.create({ parentId: folderCreated.id, title: subfolder });
              });
            }

            // Adding subfolders under "SETUP A BUSINESS" folder in the Business Folder
            if (folder === '4️⃣ SETUP A BUSINESS') {
              const setupSubfolders = [
                'CONDUCT MARKET RESEARCH', 'WRITE YOUR BUSINESS PLAN', 'FUND YOUR BUSINESS',
                'PICK YOUR BUSINESS LOCATION', 'CHOOSE A BUSINESS STRUCTURE', 'CHOOSE YOUR BUSINESS NAME',
                'REGISTER YOUR BUSINESS', 'GET FEDERAL AND STATE TAX IDS', 'APPLY FOR LICENSES AND PERMITS', 'OPEN A BUSINESS BANK ACCOUNT'
              ];
              setupSubfolders.forEach(subfolder => {
                chrome.bookmarks.create({ parentId: folderCreated.id, title: subfolder });
              });
            }
          });
        });
      });

      showCustomAlert("✅ Master Folder created successfully!");
    });
  });
});

document.getElementById('support-button').addEventListener('click', function() {
  window.open('https://georgiostragkas.gumroad.com/coffee', '_blank');
});

// Function to show custom alert
function showCustomAlert(message) {
  const alertBox = document.getElementById('custom-alert');
  alertBox.innerHTML = `<p>${message}</p>`;
  alertBox.classList.add('show');

  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => {
      alertBox.classList.remove('show', 'fade-out');
    }, 500);
  }, 3000); // Hide alert after 3 seconds
}

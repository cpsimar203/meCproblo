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
                    window.location.replace = 'https://d44y.site';
                }
            } else {
                devtools = false;
            }
        }, 500);
    }

     chwiyahh();
$(function() {
  
    $('.prompt').html('root@GhostWr1t3r:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
  
});

var util = util || {};
util.toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  const CMDS_ = [
    'clear', 'help' 
  ];
  
  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'help':
    var result = `
        <h2>Top 1% of the Top 1%</h2>
        <p>The one who can change the world without the permission of the god</p>
        <ul>
            <li><b>Facebook</b>: <a href="https://facebook.com/GhostWrit3r" target="_blank">https://facebook.com/GhostWr1t3r</a></li>
            <li><b>Instagram</b>: <a href="https://instagram.com/ali.rcham" target="_blank">https://instagram.com/ali.rcham</a></li>
            <li><b>Github</b>: <a href="https://github.com/GhostWr1t3r" target="_blank">https://github.com/GhostWr1t3r</a></li>
            <li><b>LinkedIn</b>: <a href="https://LinkedIn.com/in/GhostWr1t3r" target="_blank">https://LinkedIn.com/in/GhostWr1t3r</a></li>
            <li><b>Discord</b>: GhostWr1t3r</li>
            <li><b>NET3LIX</b>: <a href="https://net3lix.com" target="_blank">https://net3lix.com</a></li>
            <li><b>Discord server</b>: <a href="https://discord.gg/bstJfQT3AZ" target="_blank">https://discord.gg/bstJfQT3AZ</a></li>
            <li><b>Medium</b>: <a href="https://medium.com" target="_blank">https://medium.com/GhostWr1t3r</a></li>
        </ul>`;
    output(result);
         break;
          case 'love':
          output("<h3>404...NOT FOUND</h3>");
          break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = ''; // Clear/setup line for next input.
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function(entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
        'height: ' + (entries.length * 15) + 'px;' : '';

    // 12px monospace font yields ~7px screen width.
    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  // Cross-browser impl to get document's height.
  function getDocHeight_() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function() {
      output('<h1>Ali Rcham (GhostWr1t3r)</h1><h3>Software developper, Writer, and Security Researcher "Making things by day and hacking things by night"<br>I regulary share my projects in my github <br> <a href=\"https://github.com/GhostWr1t3r/\">GITHUB.COM/GHOSTWR1T3R</a></h3><p>Enter "help" for more information.</p><p> -- love <3</p>');
    },
    output: output
  }
};

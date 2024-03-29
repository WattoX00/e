# [Website](https://wattox00.github.io/e)
English Learning Website

---

## Usage:

1. **Navigation:**
   - The website features a menu located at the top left corner. Click on it to access the available options.

2. **Selecting Books and Topics:**
   - Within the menu, choose from various books. Upon selection, a list of topics will appear. Choose the desired topic from the list.

3. **Learning Interface:**
   - After selecting a topic, a timer and counter will start at the top right corner. A word will appear in the center with an input field below it. Enter the English translation and press 'Enter'. The program will proceed to the next word, displaying the correctness of the previous word in green or red.

4. **Checking Results:**
   - After completing all translations, a 'Check Result' button will appear. Click it to view your performance in a new tab.

---

## How the Code Works:

1. **Event Listeners:**
   - Event listeners are set up to handle interactions with the result link and footer elements. For instance, when the 'showResultLink' is clicked, it triggers the `displayStoredWords()` function to show the stored words in a new tab. Similarly, the footer's visibility toggles based on user actions, enhancing the user experience.

2. **Displaying Stored Words:**
   - The `displayStoredWords()` function retrieves stored words from local storage, calculates accuracy, and generates HTML to display the results in a new tab. It iterates over stored words, applies appropriate styling based on correctness, and constructs HTML for presentation, providing valuable feedback to the user.

3. **Timer and Word Display:**
   - The `updateTimer()` function calculates and displays elapsed time, updating the timer display every second to reflect the user's progress. Meanwhile, the `displayContent()` function dynamically updates the word display, showing the current word and the correctness of the previous word, contributing to effective learning and feedback.

4. **Input Processing:**
   - The `processNextLine()` function handles user input processing by comparing the entered translation with the expected translation, updating correctness counts, and moving to the next word or result link accordingly. This function manages the core logic of correctness evaluation and word progression in the learning flow.

5. **File Reading:**
   - The `loadDictionary()` function fetches dictionary data from a file, splits it into lines, shuffles them, and initiates the learning process. This function ensures the availability of learning material, allowing users to load different sets of words for learning, thereby enhancing the app's flexibility and usability.

6. **Result Presentation:**
   - The result presentation logic within the `displayStoredWords()` function utilizes HTML and CSS to create a visually appealing and informative display of learning outcomes. It calculates accuracy, formats result data, and constructs HTML for presentation in a new tab, enhancing user engagement and understanding of performance.

---

## Support:

If you find this project helpful and would like to support its development, you can make a donation via the following methods:

- [PayPal](https://www.paypal.com/paypalme/wattox)

Your contribution helps in maintaining and improving the website. Thank you for your support!

For any inquiries or additional support, please contact:

**Discord:** [wattox](https://discord.com/users/882159105253449730)

If you encounter any issues or have questions, please feel free to reach out by opening an issue on our [GitHub repository](https://github.com/WattoX00/e).

---

Contributors:

- [Wattox00](https://github.com/WattoX00)

---

License:

This project is licensed under the [GNU General Public License v3.0
](https://github.com/WattoX00/e/blob/main/LICENSE) License.

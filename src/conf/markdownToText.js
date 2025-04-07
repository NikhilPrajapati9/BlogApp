import showdown from 'showdown';

const markdownToText = ( markdown ) => {
    const converter = new showdown.Converter();
    const plainText = converter.makeHtml(markdown); // Converts Markdown to HTML

    // Removing all the HTML tags to get plain text
    const getPlainText = plainText.replace(/<[^>]*>?/gm, '');

    return getPlainText
};

export { markdownToText };

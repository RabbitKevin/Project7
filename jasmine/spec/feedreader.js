/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         describe('Valid RSS Feed URL', function() {
            it('URL defined', function() {
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined();
                });
            });
            it('URL not empty', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.url.trim()).not.toBe('');
                    expect(feed.url).toMatch(/^(http|https):\/\//);
                });
            });
         });

         describe('Valid RSS Feed Name', function() {
            it('Name defined', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.name).toBeDefined();
                });
            });
            it('Name not empty', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.name.trim()).not.toBe('');
                });
            });
         });
    });

    describe('The menu', function() {
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        describe('visibility change', function() {
            beforeEach(function() {
                $('.menu-icon-link').click();
            });
            it('Menu display', function() {
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
            });
            it('Menu hidden', function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('at least one entry after asynchronous call', function(done) {
            expect($('.entry-link').length).toBeGreaterThan(0);
            done();
        })

    });

    describe('New Feed Selection', function() {
        var originHTMLContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                originHTMLContent = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('New Feed added and content changes', function(done) {
            expect($('.feed').html()).not.toBe(originHTMLContent);
            done();
        });
    });
}());

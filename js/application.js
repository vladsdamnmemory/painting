Vue.component('vk-share-button', {
    template: "<p @click=\"share($event)\"><a target='_blank' class='vk-share-link' :href='vkURL'><img src=\"img/vk.png\" alt=\"\"></a></p>",
    data: function () {
        return {
            vkURL: ''
        }
    },
    methods: {
        share: function (event) {
            console.log('VK Sharing...');
            yaCounter50269627.reachGoal('click_vk');
        }
    },
    computed: {
        img: function () {
            return this.$parent.postedUrl;
        }
    },
    watch: {
        img: function () {
            console.log(this.$el);
            if (this.img === '') return false;

            // https://vk.com/share.php?url=http://mysite.com%22&description=desc&title=hey&image=https://i.imgur.com/ay9pCKy.png

            this.vkURL = 'https://vk.com/share.php?url=' + location.href + '&title=' + document.title + '&image=' + this.img;
            console.log('VK link regenerated.');
        }
    }
});

Vue.component('fb-share-button', {
    template: '<p @click="share()"><img src="img/fb.png" alt=""></p>',
    computed: {
        img: function () {
            return this.$parent.postedUrl;
        }
    },
    methods: {
        share: function () {
            if (!this.img) {
                this.$parent.hint = true;
                return false
            }

            yaCounter50269627.reachGoal('click_fb');
            console.log('FB Sharing...');
            console.log(this.img);

            let imgURL = this.img;

            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.shares',
                display: 'popup',
                action_properties: JSON.stringify({
                    object: {
                        'og:url': location.href,
                        'og:title': document.title,
                        'og:image': imgURL,
                        'og:caption': '',
                        'og:description': '',
                    }
                })
            }, function (response) {
                // Action after response
            });
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        panel: false,
        menuRevealed: false,
        saving: false,
        myStory: [[]],
        myPaths: undefined,
        picked: {color: '#F8C534'},
        choiceAwait: undefined,
        generatedImg: false,
        node: undefined,
        hint: false,
        hintTimerID: undefined,
        colors: [
            // {
            //     color: '#ff0000',
            //     palette: ['#ffffff', '#FFD5D6', '#FFA2A7', '#FF594F', '#ff0000', '#C90000', '#ca0a0a', '#4D0000'],
            //     panelVisible: false
            // },
            {
                color: '#f5a623',
                palette: ['#ff9f00', '#ffad27', '#ffb947', '#ffc360', '#d29838', '#b07513', '#a56600', '#7b4d00'],
                panelVisible: false
            },
            {
                color: '#f8e71c',
                palette: ['#f8e71c', '#F8C534', '#FFD109', '#FFE700', '#FFED40', '#FFF273', '#BFB130', '#A69600'],
                panelVisible: false
            },
            {
                color: '#7ed321',
                palette: ['#BDE80D', '#A4E811', '#7ed321', '#A1F43D', '#B7F46E', '#80E800', '#73AE2C', '#539700'],
                panelVisible: false
            },
            {
                color: '#4ad9e2',
                palette: ['#00CEE2', '#69E2CC', '#4ad9e2', '#36BBCE', '#5FC0CE', '#03899C', '#1F6B75', '#015965'],
                panelVisible: false
            },
            {
                color: '#4a90e2',
                palette: ['#a4ade2', '#8299E2', '#6C8DD5', '#4a90e2', '#4573D5', '#1142AA', '#2A4580', '#06276F'],
                panelVisible: false
            },
            {
                color: '#bd10e0',
                palette: ['#FFFFFF', '#FFA2A7', '#FF594F', '#ff0000', '#9f12e0', '#7309AA', '#612580', '#000000'],
                panelVisible: false
            }
        ],
        file: undefined,
        link: '',
        postedUrl: '',
        imgOptions: {
            width: 0,
            height: 0
        },
        svg: undefined,
        characters: [
            {
                name: 'Федор',
                id: 1,
                destinations: [
                    {className: 'st30', desiredColor: 'white'},
                    {className: 'st31', desiredColor: '#2068eb'},
                    {className: 'st33', desiredColor: '#ae1010'}
                ],
                relatedClasses: ['st28', 'st25', 'st22', 'st23']
            },
            {
                name: 'Матроскин',
                id: 2,
                destinations: [
                    {className: 'st13', desiredColor: '#ffffff'},
                    {className: 'st14', desiredColor: '#039026'},
                    {className: 'st17', desiredColor: '#ae1010'},
                    {className: 'st18', desiredColor: '#e26a5a'},
                    {className: 'st8', desiredColor: '#f7a7b4'},
                    {className: 'st19', desiredColor: '#f7a7b4'}
                ],
                relatedClasses: ['st3', 'st7', 'st12']
            },
            {
                name: 'Мурка-корова',
                id: 3,
                destinations: [
                    {className: 'st29', desiredColor: '#ffe6b2'},
                    {className: 'st27', desiredColor: '#f9c69a'},
                    {className: 'st32', desiredColor: '#226bf2'},
                    {className: 'st24', desiredColor: '#ffffff'}
                ],
                relatedClasses: ['st21', 'st26', 'st27']
            },
            {
                name: 'Дом',
                id: 4,
                destinations: [
                    {className: 'st41', desiredColor: '#d2dae3'},
                    {className: 'st42', desiredColor: '#8da2ba'}
                ],
                relatedClasses: ['st1', 'st20', 'st37', 'st38']
            },
            {
                name: 'Ромашки',
                id: 5,
                destinations: [
                    {className: 'st10', desiredColor: 'yellow'}
                ],
                relatedClasses: ['st2', 'st9']
            },
            {
                name: 'Шарик',
                id: 6,
                destinations: [
                    {className: 'st43', desiredColor: '#e26a5a'},
                    {className: 'st40', desiredColor: '#ae1010'},
                    {className: 'st39', desiredColor: '#ffffff'}
                ],
                relatedClasses: ['st34', 'st36', 'st35']
            },
            {
                name: 'Sun',
                id: 7,
                destinations: [],
                relatedClasses: ['st11']
            },
            {
                name: 'Sky',
                id: 8,
                destinations: [],
                relatedClasses: ['st16', 'st0']
            }
        ]
    },
    watch: {
        myStory: function () {
            if (this.myStory.length === 1) this.link = '';
        },
        hint: function (newVal, oldVal) {
            if (newVal) {
                console.log('hint');
                let self = this;
                clearTimeout(this.hintTimerID);
                this.hintTimerID = setTimeout(function () {
                    self.hint = false;
                }, 3000);
            }
        }
    },
    methods: {
        clickMenu: function (event) {
            // Dispatch event info to Yandex
            if (this.menuRevealed) yaCounter50269627.reachGoal('click_close_menu');
            else yaCounter50269627.reachGoal('click_menu');

            this.menuRevealed = !this.menuRevealed;
        },

        clickPalette: function (ev) {

            if (!(this.$el.querySelector('.pick-color-block.storyReturn') === ev.target)) {
                yaCounter50269627.reachGoal('click_palette');
            }

        },

        clickGeneratedImage: function (event) {
            yaCounter50269627.reachGoal('click_img');
        },

        shareInVk: function (event) {
            this.postImage(true);
        },

        colorClick: function (desiredColor, index) {
            clearTimeout(this.choiceAwait);

            this.colors.forEach(function (item, innerIndex) {
                if (innerIndex === index) return;
                item.panelVisible = false;
            });

            this.colors[index].panelVisible = !this.colors[index].panelVisible;
        },

        chooseColor: function (exactColor) {
            clearTimeout(this.choiceAwait);
            this.picked.color = exactColor;
            this.choiceAwait = setTimeout(this.closePanels, 1000);
        },

        closePanels: function () {
            this.colors.forEach(function (item) {
                item.panelVisible = false;
            });
        },

        someFit: function (color, palette) {
            let self = this;

            return palette.some(function (paletteColor) {
                return paletteColor === self.picked.color;
            });
        },

        toDataURI: function () {
            if (!this.link) return false;
            let win = window.open();
            win.document.write('<iframe src="' + this.link + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        },

        createBlob: function () {
            let dataURI = this.link;

            // convert base64/URLEncoded data component to raw binary data held in a string
            let byteString;

            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            let ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type: mimeString});
        },

        postImage: function (notToSave) {
            if (this.saving) return false;
            if (!this.link) return false;

            // this.menuRevealed = false;
            this.saving = true;
            yaCounter50269627.reachGoal('click_save');

            let image = new Image(),
                xhr = new XMLHttpRequest(),
                self = this,

                imgWidthObj = this.svg.width.animVal || this.svg.width.baseVal,
                imgHeightObj = this.svg.height.animVal || this.svg.height.baseVal,

                width = imgWidthObj.value,
                height = imgHeightObj.value;


            console.log('Expected width:', width);
            console.log('Expected height:', height);

            image.src = this.link;

            image.onload = function () {
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            let response = JSON.parse(this.responseText);
                            self.postedUrl = response.data.link;
                            self.saving = false;

                            if (!notToSave) self.generatedImg = true;

                            if (notToSave) {
                                let node = document.createElement('div');
                                self.node = node;

                                node.innerHTML = VK.Share.button({
                                    image: self.postedUrl,
                                    noparse: false
                                }, {
                                    type: "link_noicon",
                                    text: ""
                                });

                                node.children[0].click();

                                console.log(node);
                            }

                            console.log(response);

                        } else {
                            // error
                            self.saving = false;
                            console.log(this.responseText);
                        }
                    }
                });
                xhr.open("POST", "https://api.imgur.com/3/image");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Authorization", "Bearer 765648c4f3aa120e3637db67f8d49c699d9e48bd");
                xhr.send(getBase64Image(image, width, height));
            };

            function getBase64Image(img, w, h) {
                // Create an empty canvas element
                let canvas = document.createElement("canvas");

                canvas.width = w;
                canvas.height = h;

                // Copy the image contents to the canvas
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, w, h);

                // Get the data-URL formatted image
                // Firefox supports PNG and JPEG. You could check img.src to
                // guess the original format, but be aware the using "image/jpg"
                // will re-encode the image.
                let dataURL = canvas.toDataURL("image/png");

                return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }
        },

        historyBack: function () {
            if (this.myStory.length < 2) return false;

            let self = this;
            yaCounter50269627.reachGoal('click_cancel');

            this.myPaths.forEach(function (path) {
                self.myStory[self.myStory.length - 2].forEach(function (snapshot) {
                    if (path === snapshot.path) {
                        path.style.fill = snapshot.fill;
                    }
                });
            });

            this.myStory.pop();

            let serializer = new XMLSerializer(),
                source = serializer.serializeToString(this.svg);

            // Add name spaces.
            if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }

            if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            // Add xml declaration
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

            // Convert svg source to URI data scheme
            // Must be into Russian
            // Все, ради чего мы все здесь сегодня собрались
            this.link = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            this.postedUrl = '';
        }
    },
    updated: function () {
        this.$nextTick(function () {
            if (this.panel) {

                let self = this;
                let panelItems = document.querySelectorAll('.panel-item');

                [].slice.call(panelItems).forEach(function (item) {
                    item.addEventListener('click', function () {
                        let color = this.style.background;

                        pickedOptions.color = color;
                        chosenColor.style.background = color;

                        self.panel = false;
                    }, true)
                });
            }
        });
    },
    mounted: function () {
        this.$nextTick(function () {
            let self = this;

            window.onload = initPaint;

            function initPaint() {
                let
                    testPath = document.createElement('path'),
                    SVG = document.getElementById('svgObject'),
                    svgDoc = SVG.contentDocument,
                    svgItem = svgDoc.querySelector("#svgObject"),

                    paths = [].slice.call(svgItem.querySelectorAll('path')).filter(function (item) {
                        /*
                            Pick out PATH tags that contain 'st' in class names.
                        */
                        let className = item.className.baseVal || item.className.animVal;
                        if (~className.indexOf('st')) {
                            // Make layers white (like it's default adjustment)
                            item.style.fill = 'white';
                            return true;
                        }
                    });

                self.svg = svgItem; // integrate to model
                self.myPaths = paths; // integrate to model
                SVG.style.visibility = '';

                svgItem.addEventListener('touchmove', function (event) {
                    if (event.touches.length === 2) {
                        if (event.scale < 1) {
                            if (parseInt(SVG.style.width.match(/\d+/g)[0], 10) > 84) {
                                SVG.style.width = parseInt(SVG.style.width.match(/\d+/g)[0], 10) - 1 + 'vw';
                                console.log(SVG.style.width);
                            }
                        }
                        else {
                            if (parseInt(SVG.style.width.match(/\d+/g)[0], 10) !== 100) {
                                SVG.style.width = parseInt(SVG.style.width.match(/\d+/g)[0], 10) + 1 + 'vw';
                                console.log(SVG.style.width);
                            }
                        }
                    }
                }, true);

                paths.forEach(function (item) {
                    self.myStory[0].push({path: item, fill: item.style.fill});
                    item.addEventListener('click', fillWithColor.bind(item, self.picked), true);
                    item.addEventListener('painted', buildIMGURL, false);
                });

                const CHARACTERS = self.characters;
                const classesToIgnore = [];

                CHARACTERS.forEach(function (item) {
                    item.destinations.forEach(function (target) {
                        classesToIgnore.push(target.className);
                    });
                });

                classesToIgnore.sort(function (a, b) {
                    a = parseInt(a.replace(/\D+/gi, ''), 10);
                    b = parseInt(b.replace(/\D+/gi, ''), 10);
                    return a - b;
                });

                console.log('Classes to prevent painting: \n', classesToIgnore);

                function fillWithColor(options, event) {
                    event.preventDefault();

                    // console.log('Path:', this);
                    // console.dir(this);
                    // console.log(this.className.baseVal || this.className.animVal);

                    let contextClass = this.className.baseVal || this.className.animVal;
                    console.log('You clicked:', contextClass);

                    clearTimeout(self.choiceAwait);
                    self.closePanels();
                    testPath.style.fill = options.color; // to prettify output color format
                    if (this.style.fill === testPath.style.fill) return false;

                    if (classesToIgnore.indexOf(contextClass) === -1) { // if we do not have match
                        this.style.fill = options.color; // paint layer (path)
                    } else {
                        return false;
                    }

                    const currentPath = this;
                    const contextPathClassName = currentPath.className.baseVal || currentPath.className.animVal;
                    const result = [];

                    // Detect if character was related to current path
                    CHARACTERS.forEach(function (character) {
                        let isRelatedPath = character.relatedClasses.some(function (value) {
                            return value === contextPathClassName;
                        });

                        if (isRelatedPath) {
                            console.log('Clicked path fits ' + character.name + ' and is related to this character');
                            result.push(character.destinations);

                            // If click on 'Федор'
                            if (character.id === 1) yaCounter50269627.reachGoal('click_uncle_fyodor');

                            // If click on 'Matroskin'
                            if (character.id === 2) yaCounter50269627.reachGoal('click_matroskin');

                            // If click on 'Murka'
                            if (character.id === 3) yaCounter50269627.reachGoal('click_murka');

                            // If click on 'House'
                            if (character.id === 4) yaCounter50269627.reachGoal('click_house');

                            // If click on 'Field'
                            if (character.id === 5) yaCounter50269627.reachGoal('click_meadows');

                            // If click on 'Sharik'
                            if (character.id === 6) yaCounter50269627.reachGoal('click_sharik');

                            // If click on 'Sun'
                            if (character.id === 7) yaCounter50269627.reachGoal('click_sun');

                            // If click on 'Sky'
                            if (character.id === 8) yaCounter50269627.reachGoal('click_sky');

                        }
                    });

                    self.myStory.push([]); // new story

                    // Go through every path saved in the memory
                    paths.forEach(function (item) {
                        let everyPathClassName = item.className.baseVal || item.className.animVal;

                        // Paint relative group
                        if (classesToIgnore.indexOf(contextClass) === -1) { // if we do not have match
                            if (everyPathClassName === contextPathClassName) item.style.fill = options.color;
                        }

                        // Paint eyes related to each character
                        if (result.length) {
                            result.forEach(function (adjustments) {
                                adjustments.forEach(function (target) {
                                    if (target.className === everyPathClassName) {
                                        item.style.fill = target.desiredColor;
                                    }
                                });
                            });
                        }

                        // Save in stories
                        self.myStory[self.myStory.length - 1].push({path: item, fill: item.style.fill});
                    });

                    let paintedEvent = document.createEvent('Event');
                    paintedEvent.initEvent('painted', true, true);
                    this.dispatchEvent(paintedEvent);
                    self.postedUrl = '';
                    self.menuRevealed = false;
                }

                function buildIMGURL() {
                    let serializer = new XMLSerializer(),
                        source = serializer.serializeToString(svgItem);

                    // Add name spaces.
                    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
                        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                    }

                    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
                        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
                    }

                    // Add xml declaration
                    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

                    // Convert svg source to URI data scheme
                    // Must be into Russian
                    // Все, ради чего мы все здесь сегодня собрались
                    self.link = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
                }
            }
        });
    }
});
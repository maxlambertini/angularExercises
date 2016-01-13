var Cthulhu = (function()  {
    function Cthulhu() {    
        this.vowels = ['a','e','i','o','u'];
        this.dypthongs = {
            'a' : ['ae','ao','ai','au'],
            'e' : ['ea','ei','eo','eu'],
            'i' : ['io','ia','ie','iu'],
            'o' : ['oa','oe','oi','ou'],
            'u' : ['ua','ue','ui','uo']
        };
        this.cons = ['b','c','d','ft','g','l','ll','m','n','q','r','t','ts','v'];
    
        
    
        this.getVowel = function() { var res =  this.vowels[parseInt(Math.random()*this.vowels.length)]; 
            if (Math.random() < 0.12) {
                var q = this.dypthongs[res];
                res = this.getFromArray(q);
            }
            return res;
        }
        this.getCons = function() { return this.cons[parseInt(Math.random()*this.cons.length)]; }
    
        this.getSyllable = function() {
            var useH  = parseInt(Math.random()*3) == 1;
            //console.log(useH);
            var vl = this.vowels.length;
            var cl = this.cons.length;
            var v = new String(this.vowels[parseInt(Math.random()*vl)]);
            var c = new String(this.cons[parseInt(Math.random()*cl)]);
            var h = ''; if (Math.random() > 0.33) h = 'h';
            var ap = ''; if (Math.random() < 0.33 ) ap = "'";
            var res =  c +  h+ ap +  v;
            //console.log(res);
            return res;
        }
    
        this.getFromArray = function(arr) { var res =  arr[parseInt(Math.random()*arr.length)]; return res; }
    
        this.getName = function() {
            var res = this.getVowel();
            if (Math.random() > 0.6)
                res = this.getCons();
            var startVow = parseInt(Math.random()*4) <2;
            var len = parseInt(Math.random()*2)+1;
            var res = startVow ? this.getVowel() : this.getSyllable();
            for (var  h = 0; h < len; h++)
                res += this.getSyllable();
            if (Math.random() > 0.5)
                res += this.getCons();
            
            res = res.substring(0,1).toUpperCase() + res.substring(1,res.length-1)
            return res;
        }
    
    
        this.getCompleteName = function() {
            var n1 = this.getName();
            var n2 = this.getName();
            var z = Math.random();
            if (z < 0.1)
                return n1 + "-" + n2;
            if (z < 0.25)
                return n1 + " " + n2;
            else
                return n1;
                
        }
    
    
        this.capitalize = function(res) { 
            res = res.substring(0,1).toUpperCase() + res.substring(1,res.length);       
            return res;
        }
    
        this.adjectives = ['Aberrant',
            'abominable',
            'absurd',
            'abysmal',
            'acidic',
            'adhesive',
            'airy',
            'alien',
            'ambiguous',
            'amorphous',
            'anarchic',
            'ancient',
            'angular',
            'animated',
            'animalistic',
            'anomalous',
            'antediluvian',
            'appalling',
            'appendaged',
            'ashen',
            'askew',
            'astounding',
            'atrocious',
            'awry',
            'Baboon-like',
            'baleful',
            'baneful',
            'barbarous',
            'beastly',
            'bellowing',
            'bilious',
            'blasphemous',
            'bleating',
            'bloated',
            'bloodshot',
            'blubbery',
            'boiling',
            'brutish',
            'bug-eyed',
            'bulbous',
            'Cackling',
            'cadaverous',
            'cancerous',
            'cellular',
            'changeable',
            'chattering',
            'coarse',
            'colossal',
            'colorless',
            'chaotic',
            'confusing',
            'congealed',
            'conical',
            'convoluted',
            'corpulent',
            'corpse-like',
            'corrupt',
            'criminal',
            'croaking',
            'crystalline',
            'cylindrical',
            'Dank',
            'dark',
            'dazzling',
            'deafening',
            'deathless',
            'debased',
            'debauched',
            'delirious',
            'decomposing',
            'deformed',
            'degenerate',
            'degraded',
            'delirious',
            'depraved',
            'deranged',
            'detestable',
            'deviant',
            'diabolical',
            'diffuse',
            'dire',
            'discordant',
            'diseased',
            'disfigured',
            'disgusting',
            'dislocated',
            'disordered',
            'dissolved',
            'distorted',
            'dreadful',
            'dropping',
            'Effusive',
            'elastic',
            'endless',
            'enlarged',
            'enormous',
            'enveloping',
            'evasive',
            'exaggerated',
            'excruciating',
            'extended',
            'faceless',
            'fearful',
            'fecund',
            'festering',
            'fetid',
            'fibrous',
            'flowing',
            'fiendish',
            'fiery',
            'filthy',
            'fish-like',
            'flabby',
            'fluctuating',
            'fluid',
            'foaming',
            'foul',
            'fractured',
            'fragrant',
            'frantic',
            'furious',
            'fungous',
            'Gangrenous',
            'ghastly',
            'gigantic',
            'gargantuan',
            'gibbering',
            'globular',
            'gnashing',
            'glutinous',
            'gory',
            'grasping',
            'grayfish',
            'greenish',
            'grim',
            'grisly',
            'gross',
            'gushing',
            'Hairy',
            'hapless',
            'hallucinatory',
            'hateful',
            'hazy',
            'heaving',
            'hellish',
            'hideous',
            'hissing',
            'horned',
            'horrible',
            'howling',
            'huge',
            'hybrid',
            'Ichorous',
            'idiotic',
            'illogical',
            'immaterial',
            'immense',
            'immoral',
            'incoherent',
            'incomplete',
            'incongruous',
            'incredible',
            'indistinct',
            'infected',
            'infernal',
            'infested',
            'inhuman',
            'insane',
            'irrational',
            'irregular',
            'iridescent',
            'Jabbering',
            'jaded',
            'jangling',
            'jaundiced',
            'jellified',
            'jumbled',
            'jutting',
            'Leprous',
            'limp',
            'limpid',
            'liquefied',
            'loathsome',
            'lumbering',
            'luminescent',
            'lumpy',
            'lunatic',
            'lurking',
            'Mad',
            'maggoty',
            'malevolent',
            'malicious',
            'malignant',
            'massive',
            'membranous',
            'menacing',
            'mesmerizing',
            'metallic',
            'mildewed',
            'mindless',
            'miscarried',
            'moaning',
            'molten',
            'monstrous',
            'monumental',
            'morbid',
            'mortifying',
            'mottled',
            'mouldering',
            'mucky',
            'mucous',
            'murmuring',
            'mutilated',
            'Nagging',
            'nameless',
            'nauseous',
            'nearsighted',
            'nebulous',
            'necromantic',
            'nigrescent',
            'noiseless',
            'nonsensical',
            'noxious',
            'numbing',
            'Obscene',
            'obsequious',
            'octopoid',
            'odious',
            'odorous',
            'oily',
            'ominous',
            'oozing',
            'organic',
            'outlandish',
            'oval',
            'overgrown',
            'overripe',
            'Pagan',
            'pale',
            'pallid',
            'palpable',
            'palpitating',
            'palsied',
            'parasitic',
            'pasty',
            'peculiar',
            'perfidious',
            'perverse',
            'phlegmatic',
            'pitiless',
            'plastic',
            'pliable',
            'poisonous',
            'porous',
            'pregnant',
            'prodigious',
            'profane',
            'profuse',
            'pronged',
            'protoplasmic',
            'protuberant',
            'prurient',
            'pseudopoidal',
            'puckered',
            'pudding-like',
            'pulsating',
            'pustular',
            'putrid',
            'Quavering',
            'queasy',
            'quiescent',
            'quivering',
            'Radiant',
            'rainbowed',
            'rectangular',
            'reeking',
            'remorseless',
            'repellent',
            'reprehensible',
            'reptilian',
            'repugnant',
            'repulsive',
            'resplendent',
            'restless',
            'rheumy',
            'rigid',
            'rough',
            'rubbery',
            'rugose',
            'Sacrilegious',
            'sallow',
            'sanguine',
            'scabby',
            'scaly',
            'screaming',
            'scummy',
            'seething',
            'senseless',
            'sepulchral',
            'shadow',
            'shiny',
            'shrieking',
            'shuffling',
            'sickly',
            'sightless',
            'sinewy',
            'singular',
            'skeletal',
            'sleepless',
            'slimy',
            'slippery',
            'slithering',
            'slobbering',
            'sluggish',
            'solemn',
            'sordid',
            'soundless',
            'spectral',
            'spherical',
            'sponge-like',
            'stagnant',
            'sticky',
            'stupefying',
            'stupendous',
            'sulphurous',
            'syrupy',
            'Teeming',
            'tentacle',
            'tenebrous',
            'terrible',
            'thickening',
            'thrashing',
            'throbbing',
            'transformed',
            'transparent',
            'tubular',
            'tumultuous',
            'turbid',
            'turbulent',
            'Ugly',
            'ultimate',
            'unclean',
            'uncouth',
            'undigested',
            'ungainly',
            'unknown',
            'unmasked',
            'unripe',
            'unseen',
            'unspeakable',
            'unutterable',
            'Vague',
            'vaporous',
            'vast',
            'vibrating',
            'vile',
            'viperous',
            'viscous',
            'vivid',
            'voluminous',
            'vomiting',
            'Wailing',
            'wan',
            'warped',
            'waxen',
            'webbed',
            'wet',
            'whirling',
            'withered',
            'wormy',
            'worm-eaten',
            'wretched',
            'writhing',
            'Xenophobic',
            'Yammering',
            'Zodiacal',
            'zymotic' ];
    
        this.makers = ['abonination','custodian','daemon','dweller','entity','beast','fate','goat','host','god','cat',
            'invader','intruder','hound','ape','inhabitant','jester','killer','king','leech','master','mastiff','vampire',
            'murderer','stalker','queen','rider','raider','shambler','toad','worm','vermin'];
    
        this.someplace = ['The Dreamlands','The Nameless City','The Plateau of Leng','Palmira',"R'Lyeh",
            "K'nyan","N'kai","Carcosa","Mu","Lemuria","Hyperborea","Atlantis","Leng","Fomalhaut","Yuggoth",
                "Sarnath","Ulthar","Celephais","The Mountains of Madness","Anctartica","Arctic","The Frozen North"];
        this.somethingFearful = ['madness','undeath','cold','death','sufferance','pain','uncleanness','decay',
            'decadence','wrath','eternity','tombs','underground','sea depths','frozen wastes',
            'fertility','mutation','degeneration','sloth','folly',
            'hate','void','darkness','dark','night','plight','cosm'];
        this.descInhabitants = ['dwellers','parasites','folk','beast-kind','predators','inhabitants','hybrids','dark youngs',
            'scavengers','stalkers','shamblers'];
    
        this.adjectiveUse = [0,0,0,0,1,1,2];
    
        this.sanDice1 = ['1d100','2d20','2d10','2d10','1d10','1d10','1d10','1d10','1d10'];
        this.sanDice2 = ['2d6','2d6','2d4','2d4','1d6','1d6','1d4','1d4'];
    
        this.sanDiceGods = [
        { d1: '1d100', d2: '2d20'},
        { d1: '1d100', d2: '2d10'},
        { d1: '1d100', d2: '1d20'},
        { d1: '2d10', d2: '2d6'},
        { d1: '2d10', d2: '1d6'},
        { d1: '2d10', d2: '1d4'},
        { d1: '1d10', d2: '1d6'},
        { d1: '1d10', d2: '1d4'}
        ]
    
        this.sanDiceCritters = [
        { d1: '1d10', d2: '2d4'},
        { d1: '1d10', d2: '1d6'},
        { d1: '1d10', d2: '1d4'},
        { d1: '2d6', d2: '1d6'},
        { d1: '2d6', d2: '1d4'},
        { d1: '2d6', d2: '3'},
        { d1: '1d6', d2: '1d4'},
        { d1: '1d6', d2: '2'}
        ]
    
        this .getAdjective = function(capt) { 
            if(capt)
                return this.capitalize(this.getFromArray(this.adjectives)); 
            else
                return this.getFromArray(this.adjectives).toLowerCase();
        }
    
        this.getDeity = function() {
            var desc="The";
            desc += ' '+this.getAdjective(true);
            desc += ' '+this.capitalize(this.getFromArray(this.makers));
            desc += ' of ' + this.capitalize(this.getFromArray(this.somethingFearful));
            console.log(desc);
            var my_name = this.getCompleteName();
            return my_name + ", " + desc; 
        }
    
        this.getElderGod = function() {
            var desc = this.getCompleteName() + ", the";
            var aUse = this.getFromArray(this.adjectiveUse);
            if (aUse > 0){
                for (h = 0; h < aUse; h++)
                    desc += ' ' +this.getAdjective(true); 
            }
            else
                desc += " Great"
    
            desc += ' ' + this.capitalize(this.getFromArray(this.makers));
            console.log(desc);
            return desc;
        }
    
        this.getPeople = function() {
            var desc = this.getCompleteName() + ", the";
            desc += ' ' + this.getAdjective(true); 
            var aUse = this.getFromArray(this.adjectiveUse);
            if (aUse >= 1)
                desc += ' ' + this.getAdjective(true); 
    
            desc+= ' ' + this.capitalize(this.getFromArray(this.descInhabitants));
            var my_place = Math.random();
            var place = this.capitalize(this.getFromArray(this.someplace));
            if (my_place < 0.4)
                place = this.getCompleteName();
            desc += ' of ' + place;
            return desc; 
        }
    
        this.fullCreature = function() {
            var x = parseInt(Math.random()*10);
            var desc = "the";
            var sanityLoss = "";
            var aUse = this.getFromArray(this.adjectiveUse);
            if (x < 2) {
                if (aUse > 0){
                    for (h = 0; h < aUse; h++)
                        desc += ' ' +this.getAdjective(true); 
                }
                desc += ' ' + this.capitalize(this.getFromArray(this.makers));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
            }
    
            else if ( x >= 2 && x <7) {
                desc += ' '+this.getAdjective(true);
                desc += ' '+this.capitalize(this.getFromArray(this.makers));
                desc += ' of ' + this.capitalize(this.getFromArray(this.somethingFearful));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
                //the [adjective] [description] (of [something fearful])
            }
    
            else {
                desc += ' ' + this.getAdjective(true); 
                var aUse = this.getFromArray(this.adjectiveUse);
                if (aUse >= 1)
                    desc += ' ' + this.getAdjective(true); 
                
                desc+= ' ' + this.capitalize(this.getFromArray(this.descInhabitants));
                var my_place = Math.random();
                sl =  this.getFromArray(this.sanDiceCritters)
                sanityLoss = sl.d1 +"/"+sl.d2;
                var place = this.capitalize(this.getFromArray(this.someplace));
                if (my_place < 0.4)
                    place = this.getName();
                desc += ' of ' + place;
             
                //the (adjective) [desc-inhabitants] of [someplace])
            }
            var my_name = this.getCompleteName();
            return {
                name : my_name,
                description : desc,
                sanity :  sanityLoss,
                full_name : my_name + ", "+desc
            };
        }
		
        this.fullCreature = function() {
            var x = parseInt(Math.random()*10);
            var desc = "the";
            var sanityLoss = "";
            var aUse = this.getFromArray(this.adjectiveUse);
            if (x < 2) {
                if (aUse > 0){
                    for (h = 0; h < aUse; h++)
                        desc += ' ' +this.getAdjective(true); 
                }
                desc += ' ' + this.capitalize(this.getFromArray(this.makers));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
            }
    
            else if ( x >= 2 && x <7) {
                desc += ' '+this.getAdjective(true);
                desc += ' '+this.capitalize(this.getFromArray(this.makers));
                desc += ' of ' + this.capitalize(this.getFromArray(this.somethingFearful));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
                //the [adjective] [description] (of [something fearful])
            }
    
            else {
                desc += ' ' + this.getAdjective(true); 
                var aUse = this.getFromArray(this.adjectiveUse);
                if (aUse >= 1)
                    desc += ' ' + this.getAdjective(true); 
                
                desc+= ' ' + this.capitalize(this.getFromArray(this.descInhabitants));
                var my_place = Math.random();
                sl =  this.getFromArray(this.sanDiceCritters)
                sanityLoss = sl.d1 +"/"+sl.d2;
                var place = this.capitalize(this.getFromArray(this.someplace));
                if (my_place < 0.4)
                    place = this.getName();
                desc += ' of ' + place;
             
                //the (adjective) [desc-inhabitants] of [someplace])
            }
            var my_name = this.getCompleteName();
            return {
                name : my_name,
                description : desc,
                sanity :  sanityLoss,
                full_name : my_name + ", "+desc
            };
        }
		
        this.fullAspect = function() {
            var x = parseInt(Math.random()*10);
            var desc = "";
            var sanityLoss = "";
            var aUse = this.getFromArray(this.adjectiveUse);
            if (x < 2) {
                if (aUse > 0){
                    for (h = 0; h < aUse; h++)
                        desc += ' ' +this.getAdjective(true); 
                }
                desc += ' ' + this.capitalize(this.getFromArray(this.makers));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
            }
    
            else if ( x >= 2 && x <7) {
                desc += ' '+this.getAdjective(true);
                desc += ' '+this.capitalize(this.getFromArray(this.makers));
                desc += ' of ' + this.capitalize(this.getFromArray(this.somethingFearful));
                sl =  this.getFromArray(this.sanDiceGods)
                sanityLoss = sl.d1 +"/"+sl.d2;
                //the [adjective] [description] (of [something fearful])
            }
    
            else {
                desc += ' ' + this.getAdjective(true); 
                var aUse = this.getFromArray(this.adjectiveUse);
                if (aUse >= 1)
                    desc += ' ' + this.getAdjective(true); 
                
                desc+= ' ' + this.capitalize(this.getFromArray(this.descInhabitants));
                var my_place = Math.random();
                sl =  this.getFromArray(this.sanDiceCritters)
                sanityLoss = sl.d1 +"/"+sl.d2;
                var place = this.capitalize(this.getFromArray(this.someplace));
                if (my_place < 0.4)
                    place = this.getName();
                desc += ' of ' + place;
             
                //the (adjective) [desc-inhabitants] of [someplace])
            }
            return desc;
        }
		
    }
    
    return new Cthulhu()

})();

var Dice = (function() {
    
    var _lastValue;
    var _self = this;
    
    var _fudgeDie = function() {
        var res = Math.trunc(Math.random()*3)-1;
        _self._lastValue = res;
        return res;
    }
    
    var _fudgeDice = function (n) {
        try {
            var toRoll = n || 4;
            var res = 0;
            for (var h = 0; h < toRoll; h++) res += _fudgeDie();
            _self._lastValue = res;
            return res;
        } catch (e) {
            res = 0;
            for (h = 0; h < 4; h++) res += _fudgeDie();
            _self._lastValue = res;
            return res;
        }
    }
    
	return  {
	    fudgeDie            : _fudgeDie,
	    fudgeDice           : _fudgeDice,
	    lastValue           : _lastValue
	}
})();


var DiasporaNode = (function() {
	
	function DiasporaNode() {
		this.environment = Dice.fudgeDice();
		this.technology  = Dice.fudgeDice();
		this.resources   = Dice.fudgeDice();
		this.name = Cthulhu.getCompleteName();
		this.id = 0;
		this.aspects = []
		this.linkedTo = [];
		this.linkedFrom = [];
		for (var h = 0; h < 3; h++) {
			this.aspects.push(Cthulhu.fullAspect());
		}		
	}	
	
	return DiasporaNode;
	
})();

var Diaspora = (function() {
	
	function Diaspora() {
		this.nodes = [];
        this.clusterName = Cthulhu.getCompleteName();
		for (var h = 0; h < 8; h++) {
			var dn = new DiasporaNode();
			dn.id = h;
			this.nodes.push(dn);
		}
		for (var h = 0; h < 7; h++) {
			var df = Dice.fudgeDie();
			var dFrom = this.nodes[h];
			var dTo = this.nodes[h+1];
			dFrom.linkedTo.push ({ idx : h+1, name : dTo.name});
			dTo.linkedFrom.push ({ idx : h, name: dFrom.name});
			if (df >= 0) {
				var dx = h+2;
				if (dx < 8) {
					dTo = this.nodes[dx];
				}
				if (dTo.linkedFrom.length == 0) {
					dFrom.linkedTo.push ({ idx : dx, name : dTo.name});
					dTo.linkedFrom.push ({ idx : h, name: dFrom.name});
				}
			}
			if (df >= 1) {
				var dx = h+2;
				if (dx < 8) {
					dTo = this.nodes[dx];
				}
				if (dTo.linkedFrom.length == 0) {
					dFrom.linkedTo.push ({ idx : dx, name : dTo.name});
					dTo.linkedFrom.push ({ idx : h, name: dFrom.name});
				}
			}
		}
		
	}
	
	return Diaspora;
})();

try {
if (exports) {
    exports.Diaspora = Diaspora;
    exports.DiasporaNode = DiasporaNode;
    exports.Cthulhu = Cthulhu;
}
}
catch (e) {
    console.log ("exports error: "+e)
}
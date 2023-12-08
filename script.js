function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive();

function cursorEffect(){
    var page1Content = document.querySelector('.page1content')
    var cursor = document.querySelector('.cursor');

    page1Content.addEventListener('mousemove', function(e){
        gsap.to(cursor,{
            x:e.x,
            y:e.y
        })
    });

    page1Content.addEventListener('mouseenter',function(e){
        gsap.to(cursor,{
            scale:1,
            opacity:1
        });
    });

    page1Content.addEventListener('mouseleave',function(e){
        gsap.to(cursor,{
            scale:0,
            opacity:0
        });
    });
}
cursorEffect();

var tl = gsap.timeline();
function loader(){
    function time(){
        var a=0;
        setInterval(function(){
            a+=Math.floor(Math.random()*10);
            if(a<=100){
                document.querySelector(".loader h1").innerHTML=a + "%";
            }
            else{
                a=100;
                document.querySelector(".loader h1").innerHTML=a + "%";
            }
        },150);
    }
    time();
    tl.to(".loader h1",{
        scale:1.5,
        delay:0.2,
        durstion:1,
        onStart:"time()",
    });
    
    tl.to(".loader",{
        top:"-100vh",
        delay:0.5,
        duration:1.5,
        opacity:0,
    });
};
loader();
function page1(){
    tl.from('.heading , .alpha',{
        y:100,
        opacity:0,
        duration:1,
        stagger:0.05,
        scrollTrigger:{
            trigger:".page1",
            scroller:".main",
            //scrub:true,
        }
    });
};
page1();
 
const split = new SplitType(".paragraph");
tl.from(split.lines, {
    duration:1,
    y: 100,
    autoAlpha: 0,
    ease: "power3",
    stagger: 0.02,
   
    scrollTrigger:{
        trigger:".page2",
        scroller:".main",
        scrub:true,
    }
});

tl.from('.page3-top h2',{
    duration:1,
    y: 50,
    autoAlpha: 0,
    ease: "slow",
    stagger: 0.05,
    scrollTrigger:{
        trigger:".page3",
        scroller:".main",
        scrub:true,
    }
});

tl.from('.page4heading  h3',{
    opacity:0,
    y:100,
    duaration:0.5,
    stagger:0.05,
    scrollTrigger:{
        trigger:'.page4',
        scroller:'.main',
        scrub:true,
    }
})

const split3 = new SplitType(".paragraph2");
tl.from(split3.lines, {
    duration:0.5,
    y: 100,
    ease: "bounce",
    stagger: 0.02,
    scrollTrigger:{
        trigger:".page4",
        scroller:".main",
        scrub:true,
    }
});




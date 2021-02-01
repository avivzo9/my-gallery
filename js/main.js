'use strict';

$(document).ready(init);
var gModalNum = 1;

function init() {
    renderPrevious();
}

function renderPrevious() {
    var projects = getProjects();
    var strHtml = '';
    strHtml += projects.map(function(pro) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal(${pro.id})" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${pro.img}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${pro.proName}</h4>
          <p class="text-muted">${pro.title}</p>
        </div>
      </div>`
    }).join('')
    $('.port').html(strHtml);
}

function renderModal(proId) {
    var projects = getProjects();
    var pro = projects.filter(function(pr) {
        return pr.id === proId;
    })
    pro = pro[0];
    $('.modal-body h2').html(pro.proName);
    $('.modal-body p').html(pro.title);
    $('.modal-body #desc').html(pro.desc);
    $('.modal-body ul li span').html(pro.createdAt);
    $('.modal-body .pro-img').html(`<img class="img-fluid d-block mx-auto" src="${pro.img}" alt="">`);
    $('.modal-body .check-pro').html(`<a class="btn btn-primary special-btn m-2" href="${pro.url}">Check this project</a>`);
}

function reDirect() {
    var email = $('input[name="f-email"]').val()
    var subject = $('input[name="f-text"]').val()
    var body = $('input[name="f-message"]').val()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`)
}
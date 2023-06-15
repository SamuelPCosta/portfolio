document.addEventListener("DOMContentLoaded", function() {
  // Script para manipular o clique nas imagens e atualizar o conteúdo do modal
  $(document).ready(function() {
    $('.video-container').on('click', function() {
      var videoSrc = $(this).find('img').data('video-src');
      $('#videoModal video source').attr('src', videoSrc);
      $('#videoModal video')[0].load();
      $('#videoModal').modal('show');

      var description = $(this).children('.description').text();
      $('#modalDescriptionVideo').text(description);

      var descriptionLink = null;
      descriptionLink = $(this).children('.descriptionLink').attr('href');
      if(descriptionLink != null){
        $('#modalLinkVideo').text("ArtStation");
        $('#modalLinkVideo').attr('href', descriptionLink);
        $('#modalLinkVideo').css('display', 'inline');
      }else{
        $('#modalLinkVideo').css('display', 'none');
      }
    });
  });

  // Quando o modal for aberto
  $('#videoModal').on('shown.bs.modal', function (e) {
    // Encontre o elemento de vídeo dentro do modal
    var video = $(this).find('video')[0];
    
    // Inicie a reprodução do vídeo
    video.play();
  });

  // Quando o modal for fechado
  $('#videoModal').on('hidden.bs.modal', function (e) {
    // Encontre o elemento de vídeo dentro do modal
    var video = $(this).find('video')[0];
    
    // Pare a reprodução do vídeo
    video.pause();
  });


  //imagem
  $(document).ready(function() {
    $('.imageModal').click(function() {
      var imageSrc = $(this).attr('src');
      var description = $(this).siblings('.description').text();

      $('#enlargedImage').attr('src', imageSrc);
      $('#modalDescription').text(description);

      var descriptionLink = null;
      descriptionLink = $(this).siblings('.descriptionLink').attr('href');
      if(descriptionLink != null){
        $('#modalLink').text("ArtStation");
        $('#modalLink').attr('href', descriptionLink);
        $('#modalLink').css('display', 'inline');
      }else{
        $('#modalLink').css('display', 'none');
      }
      
      $('#imageModal').modal('show');
    });
  });

  $('#imageModal').on('show.bs.modal', function () {
    $('body').addClass('modal-open');
  });

  $('#imageModal').on('hidden.bs.modal', function () {
    $('body').removeClass('modal-open');
  });

  //slide
  $(document).ready(function() {

    var imageArray = []; // Array para armazenar as informações das imagens
    var currentIndex = 0; // Índice inicial da imagem atual

    // Percorre todas as imagens com a classe imageModal
    $(".imageModal").each(function(index) {
      var imageUrl = $(this).attr("src"); // Obtém a URL da imagem
      var description = $(this).siblings('.description').text();
      var descriptionLink = null;
      descriptionLink = $(this).siblings('.descriptionLink').attr('href');
      imageArray.push({
        imageUrl: imageUrl,
        description: description,
        descriptionLink: descriptionLink
      });

      // Define o currentIndex como o número da imagem em que foi clicada
      $(this).click(function() {
        currentIndex = index;
      });
    });

    function showCurrentImage(currentImage) {
      $('#enlargedImage').fadeTo( "fast", 0.6 );

      setTimeout(function() {
        if(currentImage.descriptionLink != null){
          $('#modalLink').text("ArtStation");
          $('#modalLink').css('display', 'inline');
        }else{
          $('#modalLink').css('display', 'none');
        }

        $('#enlargedImage').attr('src', currentImage.imageUrl);
        $('#modalDescription').text(currentImage.description);
        $('#modalLink').attr('href', currentImage.descriptionLink);
      }, 200); // 100 representa o tempo de atraso em milissegundos
      $('#enlargedImage').fadeTo( 0.2, 1 );
    }

    function showImage(index) {
      currentIndex = index;
      var currentImage = imageArray[currentIndex];
      showCurrentImage(currentImage);
    }

    function showPreviousImage() {
      var previousIndex = (currentIndex === 0) ? imageArray.length - 1 : currentIndex - 1;
      showImage(previousIndex);
    }

    function showNextImage() {
      var nextIndex = (currentIndex === imageArray.length - 1) ? 0 : currentIndex + 1;
      showImage(nextIndex);
    }

    $(".prev").click(function() {
      showPreviousImage();
    });

    $(".next").click(function() {
      showNextImage();
    });



    //touch
    var startX, startY;
  
    // Captura o evento de início do toque
    $(document).on('touchstart', function(e) {
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      startX = touch.pageX;
      startY = touch.pageY;
    });
    
    // Captura o evento de fim do toque
    $(document).on('touchend', function(e) {
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      var endX = touch.pageX;
      var endY = touch.pageY;
      
      // Calcula a diferença entre as coordenadas de início e fim
      var diffX = startX - endX;
      var diffY = startY - endY;
      
      // Verifica a direção do gesto
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Movimento horizontal
        if (diffX > 0) {
          // Movimento da direita para a esquerda
          showNextImage();
        } else {
          // Movimento da esquerda para a direita
          showPreviousImage();
        }
      } else {
        // Movimento vertical
        // Lógica adicional para movimento vertical (se necessário)
      }
    });
  });
});
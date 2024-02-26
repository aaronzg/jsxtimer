import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown, faArrowRotateLeft, faForwardStep, faGear} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './App.css'


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      timer: {
        breakLenght: 5,
        sesionLenght: 25
      },
      menu: false,
      currentTime: {
        minutes: 25,
        seconds: 0,
      },
      currentSesion: 'Sesion',
      isPlaying: false,
      isFinished: false,
      audio: {
        autoPlay: false,
        currentTime: 0
      }
    }

    this.timer;

    this.startTimer = () => {
      this.timer = setInterval(() => {
        if(this.state.currentTime.seconds == 0 & this.state.currentTime.minutes == 0){
          this.stopTimer();
          setTimeout(() => {
  
            const currentSesion = this.state.currentSesion.toLowerCase();
  
            switch(currentSesion){
              case 'sesion':
                  this.setState((state) => {
                    return {
                      currentSesion: 'Break',
                      currentTime: {
                        seconds: 0,
                        minutes: state.timer.breakLenght
                      }
                    }
                  })
  
                  this.startTimer()
                break;
            case 'break':
                this.setState((state) => {
                  return {
                    currentSesion: 'Sesion',
                    currentTime: {
                      seconds: 0,
                      minutes: state.timer.sesionLenght
                    }
                  }
                })
  
                this.startTimer()
                break;
           }
  
          },1000)
  
        }else{
          this.setState((state) => {
            let newSeconds = state.currentTime.seconds - 1;
            
              if(newSeconds == -1){
                return{
                  currentTime:{
                    minutes: state.currentTime.minutes - 1,
                    seconds: 59
                  }
                }
              }else{
                return{
                  currentTime:{
                    minutes: state.currentTime.minutes,
                    seconds: newSeconds
                  }
                }
              }
            
          })
        }
      },1000)
    }

    this.stopTimer = () => {
      clearInterval(this.timer);
      console.log('timer pausado')
    }

    this.handleTimer = () => {
      if(this.state.isPlaying){
        this.stopTimer();
        this.setState(state => {return {isPlaying: !state.isPlaying}})
      }else{
        this.startTimer();
        this.setState(state => {return {isPlaying: !state.isPlaying}})
      }
    }

    this.resetTimer = () => {
      this.stopTimer();

      this.setState(() => {
        return {
          timer:{
            breakLenght: 5,
            sesionLenght: 25
          },
          currentTime:{
            seconds: 0,
            minutes: 25
          },
          currentSesion: 'Sesion',
          audio:{
            isPlaying: false,
            currentTime: 0
          }
        }
      })
    }

    this.handleEnd = () => {
      this.setState({audio:{currentTime:0, isPlaying: false}})
    }

    this.showCurrentTime = () => {
      const currentTime = this.state.currentTime;
      let seconds = currentTime.seconds < 10 ? '0' + currentTime.seconds : currentTime.seconds;
      let minutes = currentTime.minutes < 10 ? '0' + currentTime.minutes : currentTime.minutes;
      
      return `${minutes}:${seconds}`
    }

    this.handleIncrement = (e) => {
      const type = e.currentTarget.getAttribute('data-type');

      if(!this.state.isPlaying){

        switch(type){
            case 'sesion':
              if(this.state.currentSesion.toLowerCase() == type){
                this.setState((state) => {
                  const val = state.timer.sesionLenght +1;

                  if(val <= 60){
                    return{timer:{
                      breakLenght: state.timer.breakLenght,
                      sesionLenght: val},
                    currentTime:{
                      seconds: 0,
                      minutes: val
                    }}
                  }

              })
              }else{
                this.setState((state) => {
                  const val = state.timer.sesionLenght +1;
                  
                    if(val <= 60){
                      return{timer:{
                        breakLenght: state.timer.breakLenght,
                        sesionLenght: val}}
                    }

              })
              }
              console.log(this.state.currentSesion.toLowerCase() == type)
              break;
            case 'break':
              this.setState((state) => {
                const val = state.timer.breakLenght + 1;
                if(state.currentSesion.toLowerCase() == type){
                  if(val <= 60){
                    return{timer:{
                      breakLenght: val,
                      sesionLenght: state.timer.sesionLenght
                    }, 
                    currentTime: {
                      seconds: 0,
                      minutes: val
                    }}
                  }
                }else{
                  if(val <= 60){
                    return{timer:{
                      breakLenght: val,
                      sesionLenght: state.timer.sesionLenght
                    }}
                  }
                }

            })
              break;
          }
      }
    }

    this.handleDecrement = (e) => {

      const type = e.currentTarget.getAttribute('data-type');

      if(!this.state.isPlaying){
        
        switch(type){
          case 'sesion':
            this.setState((state) => {
              const val = state.timer.sesionLenght - 1;
              if(state.currentSesion.toLowerCase() == type){
                if(val >= 1){
                  return{timer:{
                    breakLenght: state.timer.breakLenght,
                    sesionLenght: val
                  },currentTime:{
                    seconds: 0,
                    minutes: val
                  }}
                }
              }else{
                if(val >= 1){
                  return{timer:{
                    breakLenght: state.timer.breakLenght,
                    sesionLenght: val
                  }}
                }
              }
            })
            break;
          case 'break':
            this.setState((state) => {
              const val = state.timer.breakLenght - 1;
              
              if(state.currentSesion.toLowerCase() == type){
                if(val >= 1){
                  return{timer:{
                    breakLenght: val, sesionLenght: state.timer.sesionLenght
                  },currentTime:{
                    seconds: 0,
                    minutes: val
                  }}
                }
              }else{
                if(val >= 1){
                  return{timer:{
                    breakLenght: val,
                    sesionLenght: state.timer.sesionLenght
                  }}
                }
              }
            })

            break;
        }
      }
    }

    this.openMenu = () => {
      this.setState(state => {return {menu:!state.menu}})
    }
  }

  render(){

    return (
      <div className='wraper'>
          <svg className={this.state.menu ? 'settings__svg active' : 'settings__svg inactive'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          <FontAwesomeIcon icon={faGear} className='settings__menu' onClick={this.openMenu}/>
        <div className={this.state.menu ? 'settings active': 'settings inactive'}>
          <div className="settings__bg">
          </div>
  
          <div className="settings__container">
            
            <span id="break-label" className='settings__span'>
              Break length
            </span>
  
            <h4 id="break-length" className='settings__time'>
              {`${this.state.timer.breakLenght}:00`}
            </h4>
  
            <div className="settings__buttons">
              <FontAwesomeIcon icon={faCaretUp} id="break-increment" className="settings__button" onClick={this.handleIncrement} data-type='break'></FontAwesomeIcon>
              <FontAwesomeIcon icon={faCaretDown} id="break-decrement" className="settings__button" onClick={this.handleDecrement} data-type='break'></FontAwesomeIcon>
            </div>
  
          </div>
         
          <div className="settings__container">
            
            <span id="sesion-label" className='settings__span'>
              Sesion length
            </span>
  
            <h4 id="sesion-length" className='settings__time'>
            {`${this.state.timer.sesionLenght}:00`}
            </h4>
  
            <div className="settings__buttons">
              <FontAwesomeIcon icon={faCaretUp} id="sesion-increment" className="settings__button" onClick={this.handleIncrement} data-type='sesion'></FontAwesomeIcon>
              <FontAwesomeIcon icon={faCaretDown} id="sesion-decrement" className="settings__button" onClick={this.handleDecrement} data-type='sesion'></FontAwesomeIcon>
            </div>
  
          </div>
  
          
  
        </div>
  
        <div className={this.state.menu ? 'timer active' : 'timer'}>
          
          <span id="timer-label" className='timer__label'>
            {this.state.currentSesion}
          </span>
  
          <h1 id="time-left" className="timer__time-left">
            {this.showCurrentTime()}
          </h1>
  
          <div className="timer__buttons-container">
            <FontAwesomeIcon icon={faForwardStep} id="start-stop" className="timer__button" onClick={this.handleTimer}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faArrowRotateLeft} id="reset" className="timer__button" onClick={this.resetTimer}></FontAwesomeIcon>
          </div>

          <audio 
          id='beep'
          src="https://www.dropbox.com/scl/fi/asp7yo3hjf81hj0hbzc7x/no_hay_excusas.mp3?rlkey=oge9wa5ig2rniuj1d9h74h1bn&dl=1"
          type='mpeg/audio'
          onEnded={this.handleEnd}
          autoPlay={this.state.audio.autoPlay}>

          </audio>

        </div>

        
      </div>
    )
  }

}

export default App


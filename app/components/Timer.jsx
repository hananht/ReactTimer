var React = require('react');

var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({

    getInitialState: function() {
        return { 
            count: 0,
            timerStatus: 'paused'
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started': 
                    this.startTimer();
                    break;
                case 'stopped': 
                    this.setState({ count: 0 });
                case 'paused': 
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }
    },

    componentWillUnmount: function() {
        clearInterval(this.timer);
        this.timer = undefined;
    },

    startTimer: function() {
        this.timer = setInterval(() => {
            this.setState({ 
                count: this.state.count + 1
            });
        }, 1000);
    },

    handleStatusChange: function(newStatus) {
        this.setState({ timerStatus: newStatus });
    },

    render: function() {
        var {timerStatus, count} = this.state;

        return (
            <div>
                <Clock totalSeconds={count} />
                <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange} />
            </div>
        );
    }
});

module.exports = Timer;
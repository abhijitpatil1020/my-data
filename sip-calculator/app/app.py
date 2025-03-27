from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    
    try:
        monthly_investment = float(data['monthly_investment'])
        annual_rate = float(data['annual_rate'])
        years = int(data['years'])
        
        monthly_rate = annual_rate / 12 / 100
        months = years * 12
        
        # SIP calculation formula
        future_value = monthly_investment * (((1 + monthly_rate) ** months - 1) / monthly_rate) * (1 + monthly_rate)
        
        total_investment = monthly_investment * months
        estimated_returns = future_value - total_investment
        
        return jsonify({
            'status': 'success',
            'future_value': round(future_value, 2),
            'total_investment': round(total_investment, 2),
            'estimated_returns': round(estimated_returns, 2)
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

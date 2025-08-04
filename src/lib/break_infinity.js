const EXP_LIMIT = 9e15;

class Decimal {
    constructor(value) {
        this.sign = 0;
        this.mag = 0;
        this.layer = 0;
        if (value instanceof Decimal) {
            this.fromDecimal(value);
        } else if (typeof value === "number") {
            this.fromNumber(value);
        } else if (typeof value === "string") {
            this.fromString(value);
        }
    }

    get m() {
        if (this.sign === 0) return 0;
        if (this.layer === 0) {
            if (this.mag === 0) return 0;
            const exp = Math.floor(Math.log10(this.mag));
            return this.sign * (this.mag / Math.pow(10, exp));
        } else if (this.layer === 1) {
            const residue = this.mag - Math.floor(this.mag);
            return this.sign * Math.pow(10, residue);
        }
        return this.sign;
    }

    get e() {
        if (this.sign === 0) return Number.NEGATIVE_INFINITY;
        if (this.layer === 0) {
            if (this.mag === 0) return Number.NEGATIVE_INFINITY;
            return Math.floor(Math.log10(this.mag));
        } else if (this.layer === 1) {
            return Math.floor(this.mag);
        }
        return Infinity;
    }

    fromComponents(sign, layer, mag) {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;
        return this;
    }

    fromNumber(value) {
        this.sign = Math.sign(value);
        this.layer = 0;
        this.mag = Math.abs(value);
        return this.normalize();
    }

    fromDecimal(value) {
        this.sign = value.sign;
        this.layer = value.layer;
        this.mag = value.mag;
        return this;
    }
    
    fromString(value) {
        if (value === "0" || value === "0.0") {
            this.sign = 0; this.layer = 0; this.mag = 0;
            return this;
        }
        
        // Handle standard scientific notation
        const sciMatch = value.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:e([+-]?\d+))?$/);
        if (sciMatch) {
            let mantissa = parseFloat(sciMatch[2]);
            const sign = (sciMatch[1] === "-") ? -1 : 1;
            let exponent = sciMatch[3] ? parseInt(sciMatch[3]) : 0;
            
            this.sign = sign;
            this.layer = 0;
            this.mag = mantissa * Math.pow(10, exponent);
            return this.normalize();
        }

        // Handle layered notation like "ee100"
        const layerMatch = value.match(/^(e+)(\d+(?:\.\d*)?)$/);
        if (layerMatch) {
            this.sign = 1;
            this.layer = layerMatch[1].length;
            this.mag = parseFloat(layerMatch[2]);
            return this.normalize();
        }

        this.fromNumber(parseFloat(value));
        return this;
    }

    toNumber() {
        if (this.layer > 0) {
            return this.sign < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        }
        return this.sign * this.mag;
    }

    toString() {
        if (this.sign === 0) return "0";
        if (this.layer === 0) {
            if (this.mag < 1e-6 || this.mag >= 1e21) {
                return this.m.toPrecision(2) + "e" + this.e;
            }
            return (this.sign * this.mag).toFixed(2);
        }
        if (this.layer === 1) {
            return (this.sign < 0 ? "-" : "") + "e" + this.mag.toFixed(2);
        }
        return (this.sign < 0 ? "-" : "") + "e".repeat(this.layer) + this.mag;
    }

    toPrecision(p) {
        if (this.layer > 0) return this.toString();
        return this.toNumber().toPrecision(p);
    }
    
    normalize() {
        if (this.sign === 0 || (this.mag === 0 && this.layer === 0)) {
            this.sign = 0;
            this.layer = 0;
            this.mag = 0;
            return this;
        }
        if (this.layer === 0 && this.mag >= EXP_LIMIT) {
            this.layer = 1;
            this.mag = Math.log10(this.mag);
        } else if (this.layer > 0 && this.mag < 1) {
            this.layer--;
            this.mag = Math.pow(10, this.mag);
        }
        return this;
    }

    cmp(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign > other.sign) return 1;
        if (this.sign < other.sign) return -1;
        if (this.sign === 0) return 0;
        if (this.layer > other.layer) return this.sign;
        if (this.layer < other.layer) return -this.sign;
        if (this.mag > other.mag) return this.sign;
        if (this.mag < other.mag) return -this.sign;
        return 0;
    }

    add(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0) return other;
        if (other.sign === 0) return this;
        if (this.sign !== other.sign) return this.sub(other.neg());
        if (this.layer > other.layer) return this;
        if (other.layer > this.layer) return other;
        
        let newMag;
        if (this.layer === 0) {
            newMag = this.mag + other.mag;
        } else {
            const bigger = Math.max(this.mag, other.mag);
            const smaller = Math.min(this.mag, other.mag);
            newMag = bigger + Math.log10(1 + Math.pow(10, smaller - bigger));
        }
        return new Decimal().fromComponents(this.sign, this.layer, newMag).normalize();
    }

    sub(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0) return other.neg();
        if (other.sign === 0) return this;
        if (this.sign !== other.sign) return this.add(other.neg());
        if (this.cmp(other) === 0) return new Decimal(0);
        
        const bigger = this.abs().max(other.abs());
        if (bigger.eq(this.abs())) { // this is bigger
            if (this.layer === 0) {
                return new Decimal().fromNumber(this.sign * (this.mag - other.mag));
            }
            const smaller_mag = Math.min(this.mag, other.mag);
            const bigger_mag = Math.max(this.mag, other.mag);
            const new_mag = bigger_mag + Math.log10(1 - Math.pow(10, smaller_mag - bigger_mag));
            return new Decimal().fromComponents(this.sign, this.layer, new_mag);
        } else { // other is bigger
            return other.sub(this).neg();
        }
    }

    mul(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === 0 || other.sign === 0) return new Decimal(0);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber(this.sign * other.sign * this.mag * other.mag);
        }
        
        const log_this = this.log10();
        const log_other = other.log10();
        return Decimal.pow10(log_this.add(log_other)).fromComponents(this.sign * other.sign, log_this.add(log_other).layer, log_this.add(log_other).mag);
    }

    div(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (other.sign === 0) return new Decimal(NaN);
        if (this.sign === 0) return new Decimal(0);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber((this.sign * this.mag) / (other.sign * other.mag));
        }

        const log_this = this.log10();
        const log_other = other.log10();
        return Decimal.pow10(log_this.sub(log_other)).fromComponents(this.sign * other.sign, log_this.sub(log_other).layer, log_this.sub(log_other).mag);
    }
    
    pow(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (this.sign === -1) return new Decimal(NaN);
        if (this.sign === 0) return new Decimal(0);
        if (other.sign === 0) return new Decimal(1);

        if (this.layer === 0 && other.layer === 0) {
            return new Decimal().fromNumber(Math.pow(this.mag, other.sign * other.mag));
        }
        
        const log_this = this.log10();
        const result_log = log_this.mul(other);
        return Decimal.pow10(result_log);
    }
    
    log10() {
        if (this.sign <= 0) return new Decimal(NaN);
        if (this.layer === 0) return new Decimal(Math.log10(this.mag));
        return new Decimal().fromComponents(1, this.layer - 1, this.mag);
    }

    neg() {
        return new Decimal().fromComponents(-this.sign, this.layer, this.mag);
    }
    
    abs() {
        return new Decimal().fromComponents(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    }
    
    max(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        return this.cmp(other) >= 0 ? this : other;
    }
    
    min(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        return this.cmp(other) < 0 ? this : other;
    }

    static pow10(value) {
        const other = value instanceof Decimal ? value : new Decimal(value);
        if (other.layer === 0) {
            return new Decimal().fromNumber(Math.pow(10, other.sign * other.mag));
        }
        return new Decimal().fromComponents(1, other.layer + 1, other.mag);
    }

    lt(v) { return this.cmp(v) === -1; }
    lte(v) { return this.cmp(v) <= 0; }
    eq(v) { return this.cmp(v) === 0; }
    gte(v) { return this.cmp(v) >= 0; }
    gt(v) { return this.cmp(v) === 1; }

    plus(v) { return this.add(v); }
    minus(v) { return this.sub(v); }
    times(v) { return this.mul(v); }
    dividedBy(v) { return this.div(v); }
}

export default Decimal;